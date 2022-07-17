import { useAppDispatch, useAppSelector } from "appRedux/hooks";
import { setPosts } from "appRedux/postSlice";
import axios from "axios";
import { AddPosts } from "components/addPosts/addPosts";
import { FollowUsersComponent } from "components/followUsersComponent/followUseresComponents";
import { PostCard } from "components/postCard/postCard";
import { Sidebar } from "components/sidebar/sidebar";
import { showToast } from "components/toast/toast";
import { useDocumentTitle } from "hooks/useDocumentTitle";
import { useEffect, useMemo } from "react";

const Homepage = (): JSX.Element => {
	useDocumentTitle("Home");
	const { userData: { token, loggedInUser }, posts: { posts } } = useAppSelector(store => store)
	const Dispatch = useAppDispatch()

	useEffect(() => {

		(async () => {
			try {
				const res = await axios.get('/api/posts', {
					headers: { authorization: token }
				})
				Dispatch(setPosts(res.data.posts))
			}
			catch (error) {
				showToast('error', "Something went wrong while trying to load posts")
			}
		})()

	}, [Dispatch, token])

	const filteredPosts = useMemo(() => posts.filter(post => loggedInUser.following.includes(post.username) || post.userId === loggedInUser.id), [posts, loggedInUser.following, loggedInUser.id])

	return (
		<div className="mx-32 flex gap-12 p-8">
			<div className="fixed h-full">
				<Sidebar />
			</div>
			<div className="w-2/4 ml-auto">
				<AddPosts />
				<div className=" mt-8 flex flex-col gap-8">
					{filteredPosts.map(({ id, content, likes, userId, createdAt, comments }) =>
						<PostCard key={id} id={id} content={content} likes={likes} userId={userId} createdAt={createdAt} comments={comments} />
					)}

				</div>
			</div>
			<div>
				<FollowUsersComponent />
			</div>
		</div>
	);
};

export { Homepage };
