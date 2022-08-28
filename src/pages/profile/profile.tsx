import { useAppDispatch, useAppSelector } from "appRedux/hooks";
import { setLoggedInUser, userData } from "appRedux/userSlice";
import axios from "axios";
import { PostCard } from "components/postCard/postCard";
import { Sidebar } from "components/sidebar/sidebar";
import { showToast } from "components/toast/toast";
import { UserCard } from "components/userCards/userCard";
import { useDocumentTitle } from "hooks/useDocumentTitle";
import { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";

const Profile = (): JSX.Element => {
	const [user, setUser] = useState<userData>()
	const [isLoggedInUser, setIsLoggedInUser] = useState<boolean>(false)
	const [isFollowing, setIsFollowing] = useState<boolean>(false)
	const [isEdit, setIsEdit] = useState<boolean>(false)
	const [userUpdateData, setUserUpdateData] = useState<{ website: string, bio: string }>({ website: '', bio: '' })
	const [load, setLoad] = useState<{ posts: boolean, followers: boolean, following: boolean }>({ posts: true, followers: false, following: false })
	const { userData: { token, loggedInUser }, posts: { posts } } = useAppSelector(store => store)
	const Dispatch = useAppDispatch()
	const { userId } = useParams()

	useDocumentTitle("Profie")

	console.log('here', user, userUpdateData)

	useEffect(() => {
		(async () => {
			try {
				const { data } = await axios.get(`/api/users/${userId}`, {
					headers: { authorization: token },
				});
				setUser(data.user)
				setUserUpdateData({ website: data.user.website, bio: data.user.bio })
			}
			catch (error) {
				showToast('error', "Somehing went wrong while trying to load user")
			}
		})()
	}, [userId, token])

	useEffect(() => {

		setIsLoggedInUser(loggedInUser.id === userId)

	}, [loggedInUser.id, userId])

	useEffect(() => {

		loggedInUser.following.some(user => user.id === userId) ? setIsFollowing(true) : setIsFollowing(false)

	}, [loggedInUser.following, userId])

	const userPosts = useMemo(() => {
		return posts.filter(post => post.user.id === userId)
	}, [posts, userId])

	const addToFollowers = async () => {
		try {
			const res = await axios.post(
				`/api/users/follow/${user?.id}`,
				{},
				{ headers: { authorization: token } }
			);
			Dispatch(setLoggedInUser(res.data.user));
			setUser(res.data.followUser)
		} catch (error) {
			showToast("error", "Something went wrong while tring to follow the user");
		}
	};


	const removeFromFollowing = async () => {
		try {
			const res = await axios.post(
				`/api/users/unfollow/${user?.id}`,
				{},
				{ headers: { authorization: token } }
			);
			Dispatch(setLoggedInUser(res.data.user));
			setUser(res.data.followUser)
		} catch (error) {
			showToast("error", "Something went wrong while tring to unfollow the user");
		}
	}

	const updateUserDataHandler = async () => {

		try {
			const res = await axios.post('/api/users/edit', { userData: userUpdateData }, { headers: { authorization: token } })

			Dispatch(setLoggedInUser(res.data.user))
			setUser(res.data.user)
			setIsEdit(false)
		}
		catch (error) {
			showToast('error', "Something went wrong while trying to update the data")
		}

	}

	return (
		<div className="mx-32 flex gap-12 p-8">
			<div className="fixed h-full">
				<Sidebar />
			</div>
			{isEdit && <div className="fixed right-0 left-0 mx-auto w-96 bg-white dark:bg-darkCol shadow-card p-8 flex flex-col gap-4 z-10 top-40">
				<div className="flex items-center gap-2">
					<span>Profile image:</span>
					<img src={user?.profilePicture} className="rounded-full h-12" alt="profile" />
					<span
						onClick={() => setIsEdit(false)}
						className="material-icons-outlined ml-auto cursor-pointer h-8 font- hover:bg-orange-200 dark:hover:bg-orange-500 text-2xl px-2 "
					>
						close
					</span>
				</div>
				<span>Name: <span className="font-semibold">{user?.firstName} {user?.lastName}</span></span>
				<span>Username: <span className="font-semibold">{user?.username}</span></span>
				<div>
					<div>Website link:</div>
					<input onChange={(e) => setUserUpdateData({ ...userUpdateData, website: e.target.value })} value={userUpdateData.website} className="border-gray-500 border p-1 w-full mt-1" placeholder="website or portfolio...." />
				</div>
				<div>
					<div>bio:</div>
					<textarea onChange={(e) => setUserUpdateData({ ...userUpdateData, bio: e.target.value })} value={userUpdateData.bio} className="border-gray-500 border p-1 w-full mt-1 h-32" placeholder="Bio..." />
				</div>
				<button onClick={() => updateUserDataHandler()} className="bg-orange-500 p-2">Update</button>
			</div>}
			<div className="w-3/4 ml-auto shadow-card p-8">
				<div className="flex items-center">
					<img src={user?.profilePicture} className="rounded-full h-32" alt="profile" />
					<button onClick={() => isLoggedInUser ? setIsEdit(true) : isFollowing ? removeFromFollowing() : addToFollowers()} className="ml-auto mx-4 h-10 p-1 bg-orange-200 box-border rounded-md w-40 dark:bg-darker">{isLoggedInUser ? "Edit Profile" : isFollowing ? "Following" : "Follow"}</button>
				</div>
				<div className="mt-4">
					<p className="font-bold text-2xl">{user?.firstName} {user?.lastName}</p>
					<p className="text-gray-400 font-semibold">@{user?.username}</p>
					{user?.bio.trim() && <p>{user?.bio}</p>}
					{user?.website && <p><span className="font-semibold">Website: </span><a href={user?.website} target="_blank" rel="noreferrer" className="text-orange-700 cursor-pointer hover:underline">{user?.website}</a></p>}
					<div className="flex gap-4 mt-4">
						<p><span className="font-semibold">{userPosts.length}</span> Posts</p>
						<p><span className="font-semibold">{user?.followers.length}</span> Followers</p>
						<p><span className="font-semibold">{user?.following.length}</span> Following</p>
					</div>
					<div className="flex gap-40 justify-center mt-8 font-semibold text-lg border-b-2 w-3/4 m-auto">
						<span onClick={() => setLoad({ posts: true, followers: false, following: false })} className={`cursor-pointer  px-6 ${load.posts && "border-b-orange-500 border-b-2 mb-[-2px]"}`}>Posts</span>
						<span onClick={() => setLoad({ posts: false, followers: true, following: false })} className={`cursor-pointer  px-4 ${load.followers && "border-b-orange-500 border-b-2 mb-[-2px]"}`}>Followers</span>
						<span onClick={() => setLoad({ posts: false, followers: false, following: true })} className={`cursor-pointer  px-4 ${load.following && "border-b-orange-500 border-b-2 mb-[-2px]"}`}>Following</span>
					</div>
					<div className="w-2/3 m-auto mt-4 flex flex-col gap-6">
						{load.posts ? userPosts.length ? userPosts.map(post =>
							<PostCard key={post.id} post={post} />
						) : <div className="m-auto font-semibold">No posts to show</div> : load.followers ? user?.followers.length ? user?.followers.map(user =>
							<UserCard key={user.id} user={user} />
						) : <div> <span className="m-auto font-semibold">You don't have any follower, please connect with people.</span><Link className="text-orange-500" to={'/explore'}> Explore</Link></div> : load.following && user?.following.length ? user?.following.map(user =>
							<UserCard key={user.id} user={user} />
						) : <div> <span className="m-auto font-semibold">No following to show, please follow some users.</span><Link className="text-orange-500" to={'/explore'}> Explore</Link></div>}

					</div>
				</div>
			</div>

		</div>
	);
};

export { Profile };
