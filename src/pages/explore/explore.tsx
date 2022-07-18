import { useAppSelector } from "appRedux/hooks";
import { FollowUsersComponent } from "components/followUsersComponent/followUseresComponents";
import { PostCard } from "components/postCard/postCard";
import { Sidebar } from "components/sidebar/sidebar";
import { useState } from "react";

const Explore = (): JSX.Element => {
	const [sort, setSort] = useState<{ latest: Boolean, trending: Boolean }>({ latest: false, trending: false })
	const { posts } = useAppSelector(store => store.posts)

	return (
		<div className="mx-32 flex gap-12 p-8">
			<div className="fixed h-full">
				<Sidebar />
			</div>
			<div className="w-2/4 ml-auto">
				<div className="flex gap-4 text-lg text-orange-700 items-center">
					<span>Sort By:</span>
					<button onClick={() => setSort({ latest: true, trending: false })} className={`p-1 w-40 bg-orange-200 rounded-md hover:bg-orange-1001 dark:bg-darkCol ${sort.latest && "border-2 border-orange-700"}`}>Latest</button>
					<button onClick={() => setSort({ latest: false, trending: true })} className={`p-1 w-40 bg-orange-200 rounded-md hover:bg-orange-100 dark:bg-darkCol ${sort.trending && "border-2 border-orange-700"}`}>Trending</button>
				</div>
				<div className=" mt-8 flex flex-col gap-8">
					{posts.map((post) =>
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
