import { Routes as R, Route } from "react-router-dom";
import { Homepage } from "pages/homepage/homepage";
import { Landingpage } from "pages/landingpage/landingpage";
import { Explore } from "pages/explore/explore";
import { Bookmarks } from "pages/bookmarks/bookmarks";
import { PostPage } from "pages/postPage/postPage";
import { Profile } from "pages/profile/profile";
import { Login } from "pages/login/login";
import { Signup } from "pages/signup/signup";
import { Error } from "pages/error/error";
import RequireAuth from "components/auth/requireAuth";
import RequireNoAuth from "components/auth/requireNoAuth";

const Routes = (): JSX.Element => {
	return (
		<div className=" min-h-[calc(100vh-5rem)] dark:bg-darkLight dark:text-white">
			<R>
				<Route
					path="/"
					element={
						<RequireNoAuth>
							<Landingpage />
						</RequireNoAuth>
					}
				/>
				<Route
					path="/homepage"
					element={
						<RequireAuth>
							<Homepage />
						</RequireAuth>
					}
				/>
				<Route
					path="/explore"
					element={
						<RequireAuth>
							<Explore />
						</RequireAuth>
					}
				/>
				<Route
					path="/bookmarks"
					element={
						<RequireAuth>
							<Bookmarks />
						</RequireAuth>
					}
				/>
				<Route
					path="/posts/:postId"
					element={
						<RequireAuth>
							<PostPage />
						</RequireAuth>
					}
				/>
				<Route
					path="/profile/:userId"
					element={
						<RequireAuth>
							<Profile />
						</RequireAuth>
					}
				/>
				<Route
					path="/login"
					element={
						<RequireNoAuth>
							<Login />
						</RequireNoAuth>
					}
				/>
				<Route
					path="/signup"
					element={
						<RequireNoAuth>
							<Signup />
						</RequireNoAuth>
					}
				/>
				<Route path="*" element={<Error />} />
			</R>
		</div>
	);
};

export { Routes };
