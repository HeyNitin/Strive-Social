import { ReactNode } from "react";
import { useLocation, Navigate } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "appRedux/hooks";
import { setToken } from "appRedux/userSlice";

const RequireNoAuth = ({ children }: { children: ReactNode }): JSX.Element => {
	const { token } = useAppSelector((store) => store.userData);
	const res = localStorage.getItem("token");
	const location = useLocation();
	const Dispatch = useAppDispatch();

	const state = location?.state as { from: { pathname: string } };

	res && Dispatch(setToken(res));

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
