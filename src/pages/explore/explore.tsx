import { useAppSelector } from "appRedux/hooks";
import { FollowUsersComponent } from "components/followUsersComponent/followUseresComponents";
import { PostCard } from "components/postCard/postCard";
import { Sidebar } from "components/sidebar/sidebar";
import { showToast } from "components/toast/toast";
import { useMemo, useState } from "react";

const Explore = (): JSX.Element => {
	const [sort, setSort] = useState<{ latest: boolean, trending: boolean }>({ latest: false, trending: true })
	const { posts } = useAppSelector(store => store.posts)

	const sortedPosts = useMemo(() => {
		if (!sort.latest && !sort.trending) {
			return posts
		}
		else if (!sort.latest && sort.trending) {
			return posts.slice().sort((firstPost, secondPost) =>
				firstPost.likes.likeCount + firstPost.comments.commentCount > secondPost.likes.likeCount + secondPost.comments.commentCount ? -1 : 1
			)
		}
		else if (sort.latest && !sort.trending) {

			return posts.slice().sort((firstPost, secondPost) =>
				secondPost.createdAt.localeCompare(firstPost.createdAt)
			)

		}
		else {
			showToast('info', "Stop trying to hack us, it's all available on github anyways")
		}
	}, [posts, sort])

	return (
		<div className="mx-32 flex gap-12 p-8">
			<div className="fixed h-full">
				<Sidebar />
			</div>
			<div className="w-2/4 ml-auto">
				<div className="flex gap-4 items-center text-lg text-orange-700">
					<span>Sort By:</span>
					<button onClick={() => setSort({ latest: true, trending: false })} className={`p-1 bg-orange-200 box-border rounded-md w-40 dark:bg-darker ${sort.latest && "border-2 border-orange-700"}`}>Latest</button>
					<button onClick={() => setSort({ latest: false, trending: true })} className={`p-1 bg-orange-200 box-border rounded-md w-40 dark:bg-darker ${sort.trending && "border-2 border-orange-700"}`}>Trending</button>
				</div>
				<div className=" mt-8 flex flex-col gap-8">
					{sortedPosts && sortedPosts.map((post) =>
						<PostCard key={post.id} post={post} />
					)}
				</div>
			</div>
			<div>
				<FollowUsersComponent />
			</div>
		</div>
	);
};

export { Explore };
