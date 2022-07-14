import { ReactNode, useEffect, useMemo } from "react";
import { useLocation, Navigate } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "appRedux/hooks";
import { setLoggedInUser, setToken } from "appRedux/userSlice";
import { showToast } from "components/toast/toast";
import axios from "axios";

const RequireNoAuth = ({ children }: { children: ReactNode }): JSX.Element => {
	const { token } = useAppSelector((store) => store.userData);
	const res = useMemo(() => localStorage.getItem("user"), []);
	const location = useLocation();
	const Dispatch = useAppDispatch();

	const state = location?.state as { from: { pathname: string } };

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
				<Navigate
					to={state?.from?.pathname || "/homepage"}
					state={{ from: location }}
					replace={true}
				/>
			) : (
				children
			)}
		</>
	);
};

export default RequireNoAuth;
