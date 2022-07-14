import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faAdd } from "@fortawesome/free-solid-svg-icons";
import { MouseEvent, useEffect, useMemo, useRef, useState } from "react";
import { showToast } from "components/toast/toast";
import axios from "axios";
import { useAppDispatch, useAppSelector } from "appRedux/hooks";
import { setLoggedInUser, userData } from "appRedux/userSlice";
import { useNavigate } from "react-router-dom";

const FollowUsersComponent = (): JSX.Element => {
	const { token } = useAppSelector((store) => store.userData);
	const [users, setUsers] = useState<userData[]>([]);
	const [searchedUsers, setSearchedUsers] = useState<userData[]>([]);
	const [searchQuery, setSearchQuery] = useState<string>("");
	const [notFound, setNotFound] = useState<boolean>(false);
	const { loggedInUser } = useAppSelector((store) => store.userData);
	const serachRef = useRef<ReturnType<typeof setTimeout>>();
	const Navigate = useNavigate();
	const Dispatch = useAppDispatch();

	useEffect(() => {
		(async () => {
			try {
				const res = await axios.get("/api/users", {
					headers: { authorization: token },
				});
				setUsers(res.data.users);
			} catch (error) {
				showToast("error", "Something went wrong while trying to load users");
			}
		})();
	}, [token]);

	const finalUserlist = useMemo(() => {
		return users
			.filter(
				(user) =>
					user.id !== loggedInUser.id &&
					!loggedInUser.following.find((item: string) => item === user.username)
			)
			.slice(0, 3);
	}, [users, loggedInUser]);

	const searchUsers = (str: string) => {
		if (str) {
			setSearchedUsers(
				users.filter(
					(item) =>
						item.firstName.includes(str) ||
						item.lastName.includes(str) ||
						item.username.includes(str)
				)
			);
			setNotFound(true);
		} else {
			setSearchedUsers([]);
		}
	};

	const searchHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
		setSearchQuery(e.target.value);
		setNotFound(false);
		if (serachRef.current) {
			clearTimeout(serachRef.current);
		}
		serachRef.current = setTimeout(() => {
			searchUsers(e.target.value);
		}, 1000);
	};

	const followUserHandler = async (e: MouseEvent, id: string) => {
		e.stopPropagation();
		try {
			const res = await axios.post(
				`/api/users/follow/${id}`,
				{},
				{ headers: { authorization: token } }
			);
			Dispatch(setLoggedInUser(res.data.user));
			setUsers((prev) =>
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
		<aside>
			<div className="border border-orange-500">
				<FontAwesomeIcon icon={faSearch} className="mx-1" />
				<input
					onChange={(e) => searchHandler(e)}
					type={"search"}
					value={searchQuery}
					className="outline-none m-1 w-60 bg-transparent"
					placeholder="Search here"
				/>
			</div>
			<div>
				{searchQuery !== "" &&
					(searchedUsers.length > 0 ? (
						<>
							<p>Search Results</p>
							{searchedUsers.map((user) => (
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
								</div>
							))}
						</>
					) : (
						notFound && <p>No users found !</p>
					))}
			</div>
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
					<div>You're all Caught up</div>
				)}
			</div>
		</aside>
	);
};

export { FollowUsersComponent };
