import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoon, faSun } from "@fortawesome/free-solid-svg-icons";
import { useAppDispatch, useAppSelector } from "appRedux/hooks";
import { setPosts } from "appRedux/postSlice";
import axios from "axios";
import { useEffect } from "react";
import { showToast } from "components/toast/toast";

type headerTypes = {
	darkMode: Boolean;
	setDarkMode: Function;
};

const Header = ({ darkMode, setDarkMode }: headerTypes): JSX.Element => {
	const { token } = useAppSelector(store => store.userData)
	const Dispatch = useAppDispatch()

	useEffect(() => {

		(async () => {
			try {
				const res = await axios.get('/api/posts', {
					headers: { authorization: token }
				})
				Dispatch(setPosts(res.data.posts))
			}
			catch (error) {
				showToast('error', "Something went wrong while trying to load posts")
			}
		})()

	}, [Dispatch, token])

	const themeHandler = () => {
		setDarkMode((prev: boolean) => {
			localStorage.setItem("theme", JSON.stringify(!prev));
			return !prev;
		});
	};

	return (
		<header className="bg-white drop-shadow-md dark:bg-darkCol dark:text-white h-20 flex p-4 items-baseline sticky min-w-full top-0 z-30">
			<NavLink to={"/"} className="text-3xl font-bold cursor-pointer">
				<span className="text-orange-500">Strive</span> Social
			</NavLink>

			<div
				onClick={() => themeHandler()}
				className="text-2xl ml-auto mr-4 cursor-pointer text-orange-300 hover:text-slate-700 dark:text-orange-300 dark:hover:text-white"
			>
				<FontAwesomeIcon icon={darkMode ? faMoon : faSun} />
			</div>
		</header>
	);
};

export { Header };
