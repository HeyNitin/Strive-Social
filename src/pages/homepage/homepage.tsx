import { useAppSelector } from "appRedux/hooks";
import { AddPosts } from "components/addPosts/addPosts";
import { FollowUsersComponent } from "components/followUsersComponent/followUseresComponents";
import { PostCard } from "components/postCard/postCard";
import { Sidebar } from "components/sidebar/sidebar";
import { useDocumentTitle } from "hooks/useDocumentTitle";
import { useMemo } from "react";

const Homepage = (): JSX.Element => {
	useDocumentTitle("Home");
	const { userData: { loggedInUser }, posts: { posts } } = useAppSelector(store => store)

	const filteredPosts = useMemo(() => posts.filter(post => loggedInUser.following.filter(user => user.username === post.user.username).length || post.user.id === loggedInUser.id).sort((firstPost, secondPost) =>
		secondPost.createdAt.localeCompare(firstPost.createdAt)), [posts, loggedInUser.following, loggedInUser.id])

	return (
		<div className="mx-12 flex gap-12 p-4">
			<Sidebar />
			<div className="md:w-3/4 lg:w-2/4 ml-auto">
				<AddPosts />
				<div className=" mt-8 flex flex-col gap-8">
					{filteredPosts.map((post) =>
						<PostCard key={post.id} post={post} />
					)}

				</div>
			</div>
			<FollowUsersComponent />
		</div>
	);
};

export { Homepage };
