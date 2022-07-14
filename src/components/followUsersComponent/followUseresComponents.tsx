import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useMemo, useState } from "react";
import { showToast } from "components/toast/toast";
import axios from "axios";
import { useAppSelector } from "appRedux/hooks";
import { userData } from "appRedux/userSlice";

const FollowUsersComponent = (): JSX.Element => {
	const { token } = useAppSelector((store) => store.userData);
	const [users, setUsers] = useState<userData[]>([]);
	const { loggedInUser } = useAppSelector((store) => store.userData);

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
		return users.filter(
			(user) =>
				user.id !== loggedInUser.id &&
				!loggedInUser.following.find(
					(item: { id: string }) => item.id === user.id
				)
		);
	}, [users, loggedInUser]);

	return (
		<aside>
			<div className="border border-orange-500 p-1">
				<FontAwesomeIcon icon={faSearch} />
				<input
					type={"search"}
					className=" outline-none m-1 w-60"
					placeholder="Search here"
				/>
			</div>
			<div>
				<p className="text-2xl font-semibold">Follow more users</p>
				{/* {(finalUserlist as []).map((user) => (
					<div key={user.id}>
						<p>{user.firstName + " " + user.lastName}</p>
						<p>@{user.username}</p>
					</div>
				))} */}
			</div>
		</aside>
	);
};

export { FollowUsersComponent };
