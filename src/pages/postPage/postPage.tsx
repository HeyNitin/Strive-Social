import { useAppDispatch, useAppSelector } from "appRedux/hooks"
import { commentedBy, postTypes, setComments, setPosts } from "appRedux/postSlice"
import axios from "axios"
import { PostCard } from "components/postCard/postCard"
import { Sidebar } from "components/sidebar/sidebar"
import { showToast } from "components/toast/toast"
import { useEffect, useRef, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"

const PostPage = (): JSX.Element => {
    const [post, setPost] = useState<postTypes>()
    const [textArea, setTextArea] = useState<string>('')
    const { posts: { posts }, userData: { token } } = useAppSelector(store => store)
    const Dispatch = useAppDispatch()
    const { postId } = useParams()
    const Navigate = useNavigate()
    const heightRef = useRef<HTMLTextAreaElement>(null)

    useEffect(() => {
        const newPost = posts.filter(currPost => currPost.id === postId)[0]
        setPost(newPost)
    }, [postId, posts])

    useEffect(() => {
        (async () => {
            try {
                const res = await axios.get(`/api/comments/${postId}`)
                setComments({ id: postId || '', comments: res.data.comments })
            }
            catch (error) {
                showToast('error', "Couldn't load comments")
            }
        })()
    }, [postId])

    const postComment = async () => {
        try {
            const res = await axios.post(`/api/comments/add/${postId}`, { commentData: textArea }, { headers: { authorization: token } })
            Dispatch(setPosts(res.data.posts))
            setTextArea('')
        }
        catch (error) {
            showToast('error', "Something went wrong while trying to post your comment")
        }
    }

    return <div className="mx-32 flex gap-12 p-8">
        <div className="fixed h-full">
            <Sidebar />
        </div>
        <div className="w-3/4 ml-auto">
            <div>
                {post && <PostCard key={postId} post={post} />}
            </div>
            <div className="mt-10 flex flex-col">
                {post?.comments.commentedBy.map((comment: commentedBy) => {
                    return (<div key={comment.commentId} className="flex gap-4 p-2 relative">
                        <img onClick={(e) => {
                            e.stopPropagation()
                            Navigate(`/profile/${comment.id}`)
                        }}
                            className="rounded-full h-10 cursor-pointer"
                            src={comment.profilePicture}
                            alt="profile"
                        />
                        <div className="h-2/4 flex flex-col">
                            <div onClick={(e) => {
                                e.stopPropagation()
                                Navigate(`/profile/${comment.id}`)
                            }} className="flex gap-2 items-center cursor-pointer">
                                <span className="font-semibold">{comment.firstName} {comment.lastName}</span>
                                <span className="text-gray-400 hover:underline">@{comment.username}</span>
                            </div>
                            <p className="flex flex-wrap">{comment.comment}</p>
                        </div>
                    </div>)
                })}
                <div className="flex flex-col h-56">
                    <div className="border border-orange-500 min-h-16 rounded-md p-1 mt-auto">
                        <textarea ref={heightRef} onChange={(e) => setTextArea(e.target.value)} value={textArea} className="w-full outline-none bg-transparent scrollber-hide resize-none" placeholder="Add a comment..." style={{ height: heightRef.current?.scrollHeight }} />
                    </div>
                    <button disabled={textArea.trim() === ''} onClick={() => postComment()} className="p-2 bg-orange-500 rounded-md hover:bg-orange-300 w-24 mt-2 ml-auto disabled:cursor-not-allowed">Comment</button>
                </div>
            </div>
        </div>
    </div>
}

export { PostPage }