import { FollowUsersComponent } from "components/followUsersComponent/followUseresComponents";
import { Sidebar } from "components/sidebar/sidebar";
import { useDocumentTitle } from "hooks/useDocumentTitle";

const Homepage = (): JSX.Element => {
	useDocumentTitle("Home");

	return (
		<div className="mx-40">
			<div>
				<Sidebar />
			</div>
			<div></div>
			<div>
				<FollowUsersComponent />
			</div>
		</div>
	);
};

export { Homepage };
