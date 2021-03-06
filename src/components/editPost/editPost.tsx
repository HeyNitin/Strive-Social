import { postTypes } from "appRedux/postSlice"
import { useAppDispatch, useAppSelector } from "appRedux/hooks"
import { setPosts } from "appRedux/postSlice";
import axios from "axios";
import { showToast } from "components/toast/toast";
import { useEffect, useRef, useState } from "react";

const emojiArray = [
    "😅",
    "😁",
    "😆",
    "😂",
    "😎",
    "😔",
    "🤗",
    "👍",
    "❤",
    "💜",
    "💔",
    "🔥",
    "🙏",
    "👏",
    "✌",
    "♻",
];

const EditPost = ({ post, setIsEditMode, setMenuClick }: { post: postTypes, setIsEditMode: Function, setMenuClick: Function }): JSX.Element => {
    const { loggedInUser, token } = useAppSelector(store => store.userData)
    const [showEmoji, setShowEmoji] = useState<boolean>(false)
    const [textArea, setTextArea] = useState<string>(post.content)
    const emojiRef = useRef<HTMLDivElement>(null);
    const showEmojiRef = useRef<HTMLDivElement>(null);
    const Dispatch = useAppDispatch()
    const heightRef = useRef<HTMLTextAreaElement>(null)


    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            event.stopPropagation()
            if (
                emojiRef.current && showEmojiRef.current &&
                !emojiRef.current.contains(event.target as Node) && !showEmojiRef.current.contains(event.target as Node)
            ) {
                setShowEmoji(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [emojiRef, showEmojiRef]);

    const savePost = async () => {
        try {
            const res = await axios.post(`/api/posts/edit/${post.id}`, { postData: { content: textArea } }, {
                headers: { authorization: token }
            })
            Dispatch(setPosts(res.data.posts))
            setIsEditMode(false)
            setMenuClick(false)
        }
        catch (error) {
            showToast('error', "Couldn't save the post")
        }
    }


    return <div className="flex gap-2">
        <img
            className="rounded-full h-12"
            src={loggedInUser.profilePicture}
            alt="profile"
        />
        <div className=" h-fit w-full flex flex-col gap-1 relative">
            <div className=" h-fit w-full border border-orange-500 p-1 rounded-md">
                <textarea ref={heightRef} onChange={(e) => setTextArea(e.target.value)} value={textArea} className="w-full outline-none bg-transparent p-2 h-fit scrollber-hide resize-none" placeholder="Write something interesting..." style={{ height: heightRef.current?.scrollHeight }} />
                <div className="flex gap-4 justify-end">
                    <div ref={showEmojiRef} onClick={() => setShowEmoji(prev => !prev)
                    } className="flex gap-1 cursor-pointer hover:bg-orange-300 rounded-md p-1">
                        <p>Add emoticons</p>
                        <span className="material-icons-outlined">
                            add_reaction
                        </span>
                    </div>
                    <div onClick={() => showToast('info', "This feature will be available soon")} className="flex gap-1 cursor-pointer hover:bg-orange-300 rounded-md p-1">
                        <p>Add Images</p>
                        <span className="material-icons-outlined">
                            add_photo_alternate
                        </span>
                    </div>
                </div>
            </div>
            {showEmoji &&
                <div ref={emojiRef} className="flex flex-wrap w-56 p-1 rounded-md bg-orange-300 gap-1 self-end absolute bottom-0">
                    {emojiArray.map(emoji => <div key={emoji} onClick={() => setTextArea(prev => prev + emoji)} className="cursor-pointer">{emoji}</div>)}
                </div>}
            <button disabled={textArea.trim() === ''} onClick={() => savePost()} className="self-end bg-orange-500 py-1 disabled:cursor-not-allowed rounded-md px-2 m-4 w-24">Save post</button>
        </div>
    </div>
}

export { EditPost }