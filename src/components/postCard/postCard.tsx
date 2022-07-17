import { useAppDispatch, useAppSelector } from "appRedux/hooks"
import { commentsTypes, likesTypes } from "appRedux/postSlice"
import { updateBookmarks, userData } from "appRedux/userSlice"
import axios from "axios"
import { showToast } from "components/toast/toast"
import { useEffect, useMemo, useState } from "react"
import { useNavigate } from "react-router-dom"

const PostCard = ({ id, content, likes, userId, createdAt, comments }: { id: string, content: string, likes: likesTypes, userId: string, createdAt: string, comments: commentsTypes }): JSX.Element => {
    const { token, loggedInUser } = useAppSelector(store => store.userData)
    const [user, setUser] = useState<userData>()
    const [inLiked, setInLiked] = useState<boolean>(false)
    const [inBookmark, setInBookmark] = useState<boolean>(false)
    const Navigate = useNavigate()
    const Dispatch = useAppDispatch()

    const postDate = new Date(createdAt);
    const postTime = new Date(createdAt).getTime() / (1000 * 60);
    const today = Date.now() / (1000 * 60);
    const timeDifference = useMemo(() => Number((today - postTime).toFixed()), [postTime, today]);

    useEffect(() => {
        (async () => {
            try {
                const res = await axios.get(`/api/users/${userId}`, {
                    headers: { authorization: token }
                })
                setUser(res.data.user)
            }
            catch (error) {
                showToast("error", "Something went wrong while tring to fetch user data")
            }
        })()
    }, [token, userId])

    useEffect(() => {
        loggedInUser.bookmarks.filter(post => post.id === id).length ? setInBookmark(true) : setInBookmark(false)

    }, [id, loggedInUser.bookmarks])


    const addToLiked = async () => {
        try {
            const res = await axios.post(`/api/posts/like/${id}`, {}, {
                headers: { authorization: token }
            })
            console.log(res)
            setInLiked(true)
        }
        catch (error) {
            showToast('error', "Couldn't like the post")
        }
    }

    const removeFromLiked = async () => {
        try {
            const res = await axios.post(`/api/posts/dislike/${id}`, {}, {
                headers: { authorization: token }
            })
            console.log(res)
            setInLiked(false)
        }
        catch (error) {
            showToast('error', "Couldn't like the post")
        }
    }

    const addToBookmark = async () => {
        try {
            const res = await axios.post(`/api/users/bookmark/${id}`, {}, {
                headers: { authorization: token }
            })
            Dispatch(updateBookmarks(res.data.bookmarks))
        }
        catch (error) {
            showToast('error', "Something went wrong while trying to add product to bookmarks")
        }
    }

    const removeFromBookmark = async () => {
        try {
            const res = await axios.post(`/api/users/remove-bookmark/${id}`, {}, {
                headers: { authorization: token }
            })
            Dispatch(updateBookmarks(res.data.bookmarks))
        }
        catch (error) {
            showToast('error', "Something went wrong while trying to remove product from bookmarks")
        }
    }

    return <div key={id} className="shadow-card flex gap-4 p-2 relative pb-10">

        <img
            className="rounded-full h-10"
            src={user?.profilePicture}
            alt="profile"
        />
        <div>
            <div className="flex gap-2 items-center">
                <span className="font-semibold">{user?.firstName} {user?.lastName}</span>
                <span onClick={() => Navigate(`/profile/${user?.id}`)} className="text-gray-400 cursor-pointer">@{user?.username}</span>
                <div className="h-1 w-1 rounded-full bg-gray-400 self-center"></div>
                <span className=" text-sm text-gray-400 mt-0.5">
                    {timeDifference < 1
                        ? "just now"
                        : timeDifference < 60
                            ? timeDifference + "m ago"
                            : timeDifference / 24 < 24
                                ? timeDifference / 24 + "h ago"
                                : `${postDate.toString().slice(3, 10)}`}
                </span>
            </div>
            <p className="flex flex-wrap mt-4">{content}</p>
            <div className="absolute bottom-2 right-2 flex mt-2 gap-4">
                <div onClick={() => inLiked ? removeFromLiked() : addToLiked()} className="flex items-center gap-1 cursor-pointer">
                    <span className="material-icons-outlined">
                        {inLiked ? "favorite" : "favorite_border"}
                    </span>
                    <p className="text-xl">{likes.likeCount?.toString() || 0}</p>
                </div>
                <div className="flex items-center gap-1 cursor-pointer">
                    <span className="material-icons-outlined">
                        chat
                    </span>
                    <p className="text-xl">{comments.commentCount?.toString() || 0}</p>
                </div>
                <div onClick={() => inBookmark ? removeFromBookmark() : addToBookmark()} className="flex items-center gap-1 cursor-pointer">
                    <span className="material-icons-outlined">
                        {inBookmark ? "bookmark" : "bookmark_border"}
                    </span>
                </div>
            </div>
        </div>


    </div >
}

export { PostCard }