import axios from "axios";
import { FormEvent, useReducer } from "react";
import { useDocumentTitle } from "hooks/useDocumentTitle";
import { showToast } from "components/toast/toast";
import { useLocation, useNavigate } from "react-router-dom";
import { loginReducer } from "pages/login/loginReducer";
import { loginInitialValueTypes } from "pages/login/loginTypes.type";
import { setToken } from "appRedux/userSlice";
import { useAppDispatch } from "appRedux/hooks";

const initialValue: loginInitialValueTypes = {
	userName: "",
	password: "",
	errorMsg: "",
	error: false,
	rememberMe: false,
	defaultCredentials: false,
};

const Login = (): JSX.Element => {
	const [state, dispatch] = useReducer(loginReducer, initialValue);
	const Navigate = useNavigate();
	const location = useLocation();
	const Dispatch = useAppDispatch();

	const loginHandler = async (e: FormEvent) => {
		e.preventDefault();
		if (state.userName !== "" && state.password !== "") {
			try {
				const { data } = await axios.post("/api/auth/login", {
					username: state.userName.toLowerCase(),
					password: state.password,
				});
				Dispatch(setToken(data.encodedToken));
				switch (state.rememberMe) {
					case true:
						localStorage.setItem("token", JSON.stringify(data.encodedToken));
						break;

					default:
						break;
				}
				showToast("success", "You're successfully logged in");
			} catch (error) {
				dispatch({ type: "Error", payload: "Wrong Credentials" });
			}
		} else {
			dispatch({
				type: "Error",
				payload: "Please enter both Username and Password",
			});
		}
	};

	useDocumentTitle("Login");

	return (
		<div className="flex">
			<div className="mx-auto mb-8 mt-24 h-fit shadow-card w-96 rounded-md py-2 px-8 text-md">
				<p className="m-4 text-center text-2xl">Login</p>
				<form
					onSubmit={(e) => {
						loginHandler(e);
					}}
				>
					<div>
						<label htmlFor="userName">User Name</label>
						<input
							className="mb-4 border border-black rounded w-full dark:text-black focus:outline-none focus:bg-white"
							onChange={(e) =>
								dispatch({ type: "UserName", payload: e.target.value })
							}
							value={state.userName}
							id="userName"
							placeholder="HeyNitin"
						/>
					</div>
					<div>
						<label htmlFor="password">Password</label>
						<input
							className="mb-4 border border-black rounded w-full dark:text-black focus:outline-none focus:bg-white"
							onChange={(e) =>
								dispatch({ type: "Password", payload: e.target.value })
							}
							value={state.password}
							id="password"
							type="password"
							placeholder="********"
						/>
					</div>
					<div className="flex">
						<input
							className="mr-2 w-4"
							onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
								dispatch({ type: "RememberMe", payload: e.target.checked })
							}
							checked={state.rememberMe}
							id="remember-me"
							type="checkbox"
						/>
						<label className="mr-auto" htmlFor="remember-me">
							Remember me
						</label>
					</div>
					<div className="flex">
						<input
							className="mr-2 w-4"
							onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
								dispatch({
									type: "DefaultCredentials",
									payload: e.target.checked,
								})
							}
							checked={state.defaultCredentials}
							id="defaultCredentials"
							type="checkbox"
						/>
						<label className="mr-auto" htmlFor="defaultCredentials">
							Default Credentials
						</label>
					</div>
					<div>
						<button className="w-full text-center p-2 mt-8 bg-orange-600 hover:bg-orange-400 text-white">
							Login
						</button>
						<p
							className="cursor-pointer flex w-full justify-center mt-4 mb-2"
							onClick={() =>
								Navigate("/signup", {
									state: location?.state,
								})
							}
						>
							New User? Create New Account
						</p>
					</div>
					{state.error && (
						<div className="text-red-500 flex justify-center items-center">
							{state.errorMsg}
						</div>
					)}
				</form>
			</div>
		</div>
	);
};

export { Login };
