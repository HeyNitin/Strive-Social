import { useAppSelector } from "appRedux/hooks";
import { userData } from "appRedux/userSlice";
import axios from "axios";
import { Sidebar } from "components/sidebar/sidebar";
import { showToast } from "components/toast/toast";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const Profile = (): JSX.Element => {
	const [user, setUser] = useState<userData>()
	const { token } = useAppSelector(store => store.userData)
	const { userId } = useParams()

	useEffect(() => {
		(async () => {
			try {
				const response = await axios.get(`/api/users/${userId}`, {
					headers: { authorization: token },
				});
				setUser(response.data.user)
			}
			catch (error) {
				showToast('error', "Somehing went wrong while trying to load user")
			}
		})()
	}, [userId, token])

	console.log(user)


	return (
		<div className="mx-32 flex gap-12 p-8">
			<div className="fixed h-full">
				<Sidebar />
			</div>
			<div className="w-2/4 ml-auto">
			</div>
		</div>
	);
};

export { Profile };
