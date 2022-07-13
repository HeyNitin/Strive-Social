// import { useLocation } from "react-router-dom";
// import { useAuth } from "contexts/authContext/authContext";
import { ReactNode } from "react";

const RequireAuth = ({ children }: { children: ReactNode }): JSX.Element => {
	// const { token } = useAuth();
	// const res = localStorage.getItem("token");
	// const location = useLocation();

	return (
		<>{children}</>
		// <>
		// 	{res || token ? (
		// 		children
		// 	) : (
		// 		<Navigate to="/login" state={{ from: location }} replace={true} />
		// 	)}
		// </>
	);
};

export default RequireAuth;
