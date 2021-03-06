import { useAppDispatch, useAppSelector } from "appRedux/hooks";
import { updateBookmarks } from "appRedux/userSlice";
import axios from "axios";
import { PostCard } from "components/postCard/postCard";
import { Sidebar } from "components/sidebar/sidebar";
import { showToast } from "components/toast/toast";
import { useDocumentTitle } from "hooks/useDocumentTitle";
import { useEffect, useMemo } from "react";
import { Link } from "react-router-dom";

const Bookmarks = (): JSX.Element => {
	const { token, loggedInUser } = useAppSelector(store => store.userData)
	const { posts } = useAppSelector(store => store.posts)
	const Dispatch = useAppDispatch()

	useDocumentTitle("Bookmarks")

	useEffect(() => {
		(async () => {
			try {
				const res = await axios.get('/api/users/bookmark', {
					headers: { authorization: token }
				})
				Dispatch(updateBookmarks(res.data.bookmarks))
			}
			catch (error) {
				showToast('error', "Something went wrong while tring to load bookmakrs")
			}
		})()
	}, [Dispatch, token])

	const bookmarks = useMemo(() => posts.filter(post => loggedInUser.bookmarks.some(item => item.id === post.id)), [posts, loggedInUser.bookmarks])

	return (
		<div className="mx-32 flex gap-12 p-8">
			<div className="fixed h-full">
				<Sidebar />
			</div>
			<div className="w-3/4 ml-auto flex flex-col gap-8">
				{bookmarks.length > 0 ? (bookmarks.map(post =>
					<PostCard key={post.id} post={post} />
				)) : (<div className="text-xl font-semibold text-center">Nothin's in here, Go to <Link className="text-gray-500" to={'/homepage'}>Homepage</Link></div>)}
			</div>
		</div>
	)
};

export { Bookmarks };
