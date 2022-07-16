import { AddPosts } from "components/addPosts/addPosts";
import { FollowUsersComponent } from "components/followUsersComponent/followUseresComponents";
import { Sidebar } from "components/sidebar/sidebar";
import { useDocumentTitle } from "hooks/useDocumentTitle";

const Homepage = (): JSX.Element => {
	useDocumentTitle("Home");

	return (
		<div className="mx-32 flex gap-12 p-8">
			<div>
				<Sidebar />
			</div>
			<div className="grow">
				<AddPosts />
			</div>
			<div>
				<FollowUsersComponent />
			</div>
		</div>
	);
};

export { Homepage };
