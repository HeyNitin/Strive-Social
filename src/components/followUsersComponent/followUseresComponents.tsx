import { useEffect, useState } from "react";
import { showToast } from "components/toast/toast";
import axios from "axios";
import { useAppSelector } from "appRedux/hooks";
import { userData } from "appRedux/userSlice";
import { SearchComponent } from "components/followUsersComponent/searchComponent";
import { ShouldFollowComponent } from "./shouldFollowComponent";

const FollowUsersComponent = (): JSX.Element => {
	const { token } = useAppSelector((store) => store.userData);
	const [users, setUsers] = useState<userData[]>([]);

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

	return (
		<aside className="hidden md:block w-100">
			<SearchComponent users={users} />
			<ShouldFollowComponent users={users} setUsers={setUsers} />
		</aside>
	);
};

export { FollowUsersComponent };
