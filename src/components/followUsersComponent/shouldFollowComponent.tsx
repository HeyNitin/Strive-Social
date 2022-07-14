import { MouseEvent, useEffect, useMemo, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAdd } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { setLoggedInUser, userData } from "appRedux/userSlice";
import { useAppDispatch, useAppSelector } from "appRedux/hooks";
import axios from "axios";
import { showToast } from "components/toast/toast";

const ShouldFollowComponent = ({
	users,
	setUsers,
}: {
	users: userData[];
	setUsers: Function;
}): JSX.Element => {
	const Navigate = useNavigate();
	const Dispatch = useAppDispatch();
	const { loggedInUser } = useAppSelector((store) => store.userData);
	const { token } = useAppSelector((store) => store.userData);
	const [loading, setLoading] = useState<boolean>(true);

	const finalUserlist = useMemo(() => {
		const result = users
			.filter(
				(user) =>
					user.id !== loggedInUser.id &&
					!loggedInUser.following.find((item: string) => item === user.username)
			)
			.slice(0, 3);
		return result;
	}, [users, loggedInUser]);

	useEffect(() => {
		setTimeout(() => {
			setLoading(false);
		}, 500);
	}, []);

	const followUserHandler = async (e: MouseEvent, id: string) => {
		e.stopPropagation();
		try {
			const res = await axios.post(
				`/api/users/follow/${id}`,
				{},
				{ headers: { authorization: token } }
			);
			Dispatch(setLoggedInUser(res.data.user));
			setUsers((prev: userData[]) =>
				prev.map((item) =>
					item.id === res.data.followUser.id ? res.data.followUser : item
				)
			);
		} catch (error) {
			console.log(error);
			showToast("error", "Something went wrong while tring to follow the user");
		}
	};

	return (
		<div>
			<p className="text-xl my-4 font-semibold">Follow more users</p>
			{finalUserlist.length > 0 ? (
				finalUserlist.map((user) => (
					<div
						onClick={() => Navigate(`/profile/${user.id}`)}
						key={user.id}
						className="flex gap-2 my-2 border border-orange-500 items-center p-1 rounded-md w-72 cursor-pointer"
					>
						<img
							className="rounded-full h-10"
							src={user.profilePicture}
							alt="profile"
						/>
						<div>
							<p>{user.firstName + " " + user.lastName}</p>
							<p className="text-gray-400">@{user.username}</p>
						</div>
						<div
							onClick={(e) => followUserHandler(e, user.id)}
							className="flex items-center ml-auto cursor-pointer text-orange-500"
						>
							<p>Follow</p>
							<FontAwesomeIcon className="text-xs mt-1 mr-1" icon={faAdd} />
						</div>
					</div>
				))
			) : (
				<div className="w-72 text-center font-semibold">
					{loading ? "Loading..." : "You're all Caught up!"}
				</div>
			)}
		</div>
	);
};

export { ShouldFollowComponent };
