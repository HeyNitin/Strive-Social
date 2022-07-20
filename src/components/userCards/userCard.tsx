import { userType } from "appRedux/postSlice"
import { useNavigate } from "react-router-dom"

const UserCard = ({ user }: { user: userType }): JSX.Element => {
    const Navigate = useNavigate()
    const { id, profilePicture, firstName, lastName, username } = user


    return <div key={id} className="flex gap-4 p-2 relative shadow-card">
        <img onClick={(e) => {
            e.stopPropagation()
            Navigate(`/profile/${id}`)
        }}
            className="rounded-full h-10 cursor-pointer"
            src={profilePicture}
            alt="profile"
        />
        <div className="h-2/4 flex flex-col">
            <div onClick={(e) => {
                e.stopPropagation()
                Navigate(`/profile/${id}`)
            }} className="flex gap-2 items-center cursor-pointer">
                <span className="font-semibold">{firstName} {lastName}</span>
                <span className="text-gray-400 hover:underline">@{username}</span>
            </div>
        </div>
    </div>


}

export { UserCard }