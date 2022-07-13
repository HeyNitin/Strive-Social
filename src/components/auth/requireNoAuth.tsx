// import { useLocation } from "react-router-dom";
// import { useAuth } from "contexts/authContext/authContext";
import { ReactNode } from "react";

const RequireNoAuth = ({ children }: { children: ReactNode }): JSX.Element => {
	// const { token } = useAuth();
	// const res = localStorage.getItem("token");
	// const location = useLocation();

	// const state = location?.state as { from: { pathname: string } };
	return (
		<>{children}</>
		// <>
		// 	{res || token ? (
		// 		<Navigate
		// 			to={state?.from?.pathname || "/"}
		// 			state={{ from: location }}
		// 			replace={true}
		// 		/>
		// 	) : (
		// 		children
		// 	)}
		// </>
	);
};

export default RequireNoAuth;
