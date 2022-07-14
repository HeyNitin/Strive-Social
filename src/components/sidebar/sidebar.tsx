import { NavLink, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faHouse,
	faMagnifyingGlass,
	faBell,
	faBookmark,
	faUser,
} from "@fortawesome/free-solid-svg-icons";
import { setToken } from "appRedux/userSlice";
import { showToast } from "components/toast/toast";
import { useAppDispatch } from "appRedux/hooks";

const Sidebar = (): JSX.Element => {
	const Navigate = useNavigate();
	const Dispatch = useAppDispatch();

	const logoutHandler = () => {
		Dispatch(setToken(""));
		localStorage.removeItem("token");
		Navigate("/");
		showToast("success", "You're successfully logged out");
	};

	return (
		<aside className="sidebar hidden dark:bg-darker shadow-footer fixed h-4/5 w-60 py-8 px-4 lg:flex flex-col gap-4 my-12">
			<NavLink to={"/homepage"}>
				<div
					className={
						"hover:bg-slate-200 dark:hover:bg-darkLight py-2 p-1 rounded-md flex flex-row items-center gap-4"
					}
				>
					{" "}
					<FontAwesomeIcon icon={faHouse} />
					Homepage
				</div>
			</NavLink>
			<NavLink to={"/explore"}>
				<div
					className={
						"hover:bg-slate-200 dark:hover:bg-darkLight py-2 p-1 rounded-md flex flex-row items-center gap-4"
					}
				>
					<FontAwesomeIcon icon={faMagnifyingGlass} />
					Explore
				</div>
			</NavLink>
			<NavLink to={"/notifications"}>
				<div
					className={
						"hover:bg-slate-200 dark:hover:bg-darkLight py-2 p-1 rounded-md flex flex-row items-center gap-4"
					}
				>
					<FontAwesomeIcon icon={faBell} />
					Notifications
				</div>
			</NavLink>
			<NavLink to={"/bookmarks"}>
				<div
					className={
						"hover:bg-slate-200 dark:hover:bg-darkLight py-2 p-1 rounded-md flex flex-row items-center gap-4"
					}
				>
					<FontAwesomeIcon icon={faBookmark} />
					Bookmarks
				</div>
			</NavLink>
			<NavLink to={"/profile"}>
				<div
					className={
						"hover:bg-slate-200 dark:hover:bg-darkLight py-2 p-1 rounded-md flex flex-row items-center gap-4"
					}
				>
					<FontAwesomeIcon icon={faUser} />
					Profile
				</div>
			</NavLink>
			<button
				className="w-full text-center p-1 mt-auto bg-orange-600 text-white hover:bg-orange-400"
				onClick={() => logoutHandler()}
			>
				Logout
			</button>
		</aside>
	);
};

export { Sidebar };
