import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useMemo, useRef, useState } from "react";
import { showToast } from "components/toast/toast";
import axios from "axios";
import { useAppSelector } from "appRedux/hooks";
import { userData } from "appRedux/userSlice";

const FollowUsersComponent = (): JSX.Element => {
	const { token } = useAppSelector((store) => store.userData);
	const [users, setUsers] = useState<userData[]>([]);
	const [searchedUsers, setSearchedUsers] = useState<userData[]>([]);
	const [searchQuery, setSearchQuery] = useState<string>("");
	const [notFound, setNotFound] = useState<boolean>(false);
	const { loggedInUser } = useAppSelector((store) => store.userData);
	const serachRef = useRef<ReturnType<typeof setTimeout>>();

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
							{searchedUsers.map((item) => (
								<div key={item.id}>{item.firstName}</div>
							))}
						</>
					) : (
						notFound && <p>No users found !</p>
					))}
			</div>
			<div>
				<p className="text-2xl font-semibold">Follow more users</p>
				{finalUserlist.map((user) => (
					<div key={user.id}>
						<p>{user.firstName + " " + user.lastName}</p>
						<p>@{user.username}</p>
					</div>
				))}
			</div>
		</aside>
	);
};

export { FollowUsersComponent };
