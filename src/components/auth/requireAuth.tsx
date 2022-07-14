import { ReactNode, useEffect, useMemo } from "react";
import { useLocation, Navigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "appRedux/hooks";
import { setLoggedInUser, setToken } from "appRedux/userSlice";
import axios from "axios";
import { showToast } from "components/toast/toast";

const RequireAuth = ({ children }: { children: ReactNode }): JSX.Element => {
	const { token } = useAppSelector((store) => store.userData);
	const location = useLocation();
	const res = useMemo(() => localStorage.getItem("user"), []);
	const Dispatch = useAppDispatch();

	useEffect(() => {
		(async () => {
			if (res) {
				let user = JSON.parse(res);
				Dispatch(setToken(user.token));
				try {
					const response = await axios.get(`/api/users/${user.id}`, {
						headers: { authorization: user.token },
					});
					Dispatch(setLoggedInUser(response.data.user));
				} catch (error) {
					showToast("error", "Something went wrong");
				}
			}
		})();
	}, [Dispatch, res]);

	return (
		<>
			{res || token ? (
				children
			) : (
				<Navigate to="/login" state={{ from: location }} replace={true} />
			)}
		</>
	);
};

export default RequireAuth;
