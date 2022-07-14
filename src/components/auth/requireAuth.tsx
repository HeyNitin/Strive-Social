import { ReactNode } from "react";
import { useLocation, Navigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "appRedux/hooks";
import { setToken } from "appRedux/userSlice";

const RequireAuth = ({ children }: { children: ReactNode }): JSX.Element => {
	const { token } = useAppSelector((store) => store.userData);
	const res = localStorage.getItem("token");
	const location = useLocation();
	const Dispatch = useAppDispatch();

	res && Dispatch(setToken(res));

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
