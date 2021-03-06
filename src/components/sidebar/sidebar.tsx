import { NavLink, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faHouse,
	faMagnifyingGlass,
	faBookmark,
	faUser,
} from "@fortawesome/free-solid-svg-icons";
import { setToken } from "appRedux/userSlice";
import { showToast } from "components/toast/toast";
import { useAppDispatch, useAppSelector } from "appRedux/hooks";

const Sidebar = (): JSX.Element => {
	const Navigate = useNavigate();
	const Dispatch = useAppDispatch();
	const { loggedInUser } = useAppSelector(store => store.userData)

	const logoutHandler = () => {
		Dispatch(setToken(""));
		localStorage.removeItem("user");
		Navigate("/");
		showToast("success", "You're successfully logged out");
	};

	return (
		<aside className="sidebar dark:bg-darker shadow-footer h-3/4 w-60 py-8 px-4 flex flex-col gap-4 my-12 text-lg">
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
			<NavLink to={`/profile/${loggedInUser.id}`}>
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
