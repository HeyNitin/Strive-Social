import { useAppSelector } from "appRedux/hooks";
import { userData } from "appRedux/userSlice";
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
	const [load, setLoad] = useState<{ posts: boolean, followers: boolean, following: boolean }>({ posts: false, followers: false, following: false })
	const { userData: { token, loggedInUser }, posts: { posts } } = useAppSelector(store => store)
	const { userId } = useParams()

	useDocumentTitle("Profie")

	useEffect(() => {
		(async () => {
			try {
				const response = await axios.get(`/api/users/${userId}`, {
					headers: { authorization: token },
				});
				setUser(response.data.user)
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

		loggedInUser.following.some(user => user.id === userId) && setIsFollowing(true)

	}, [loggedInUser.following, userId])

	const userPosts = useMemo(() => {
		return posts.filter(post => post.user.id === userId)
	}, [posts, userId])

	return (
		<div className="mx-32 flex gap-12 p-8">
			<div className="fixed h-full">
				<Sidebar />
			</div>
			<div className="w-3/4 ml-auto shadow-card p-8">
				<div className="flex items-center">
					<img src={user?.profilePicture} className="rounded-full h-32" alt="profile" />
					<button className="ml-auto mx-4 h-10 p-1 bg-orange-200 box-border rounded-md w-40 dark:bg-darker">{isLoggedInUser ? "Edit Profile" : isFollowing ? "Following" : "Follow"}</button>
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
					<div className="flex gap-24 justify-center mt-8 font-semibold text-lg border-b-2 w-3/5 m-auto">
						<span onClick={() => setLoad({ posts: true, followers: false, following: false })} className={`cursor-pointer  px-6 ${load.posts && "border-b-orange-500 border-b-2 mb-[-2px]"}`}>Posts</span>
						<span onClick={() => setLoad({ posts: false, followers: true, following: false })} className={`cursor-pointer  px-4 ${load.followers && "border-b-orange-500 border-b-2 mb-[-2px]"}`}>Followers</span>
						<span onClick={() => setLoad({ posts: false, followers: false, following: true })} className={`cursor-pointer  px-4 ${load.following && "border-b-orange-500 border-b-2 mb-[-2px]"}`}>Following</span>
					</div>
					<div className="w-1/2 m-auto mt-4 flex flex-col gap-6">
						{load.posts ? userPosts.length ? userPosts.map(post =>
							<PostCard post={post} />
						) : <div className="m-auto font-semibold">No posts to show</div> : load.followers ? user?.followers.length ? user?.followers.map(user =>
							<UserCard user={user} />
						) : <div> <span className="m-auto font-semibold">You don't have any follower, please connect with people.</span><Link className="text-orange-500" to={'/explore'}> Explore</Link></div> : load.following && user?.following.length ? user?.following.map(user =>
							<UserCard user={user} />
						) : <div> <span className="m-auto font-semibold">No following to show, please follow some users.</span><Link className="text-orange-500" to={'/explore'}> Explore</Link></div>}

					</div>
				</div>
			</div>
		</div>
	);
};

export { Profile };
