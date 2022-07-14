import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { useRef, useState } from "react";
import { userData } from "appRedux/userSlice";
import { useNavigate } from "react-router-dom";

const SearchComponent = ({ users }: { users: userData[] }): JSX.Element => {
	const [searchedUsers, setSearchedUsers] = useState<userData[]>([]);
	const [searchQuery, setSearchQuery] = useState<string>("");
	const [notFound, setNotFound] = useState<boolean>(false);
	const serachRef = useRef<ReturnType<typeof setTimeout>>();
	const Navigate = useNavigate();

	const searchUsers = (str: string) => {
		if (str) {
			setSearchedUsers(
				users.filter(
					(item) =>
						item.firstName.includes(str) ||
						item.lastName.includes(str) ||
						item.username.includes(str)
				)
			);
			setNotFound(true);
		} else {
			setSearchedUsers([]);
		}
	};

	const searchHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
		setSearchQuery(e.target.value);
		setNotFound(false);
		if (serachRef.current) {
			clearTimeout(serachRef.current);
		}
		serachRef.current = setTimeout(() => {
			searchUsers(e.target.value);
		}, 1000);
	};
	return (
		<div>
			<div className="border border-orange-500">
				<FontAwesomeIcon icon={faSearch} className="mx-1" />
				<input
					onChange={(e) => searchHandler(e)}
					type={"search"}
					value={searchQuery}
					className="outline-none m-1 w-64 bg-transparent"
					placeholder="Search here"
				/>
			</div>
			<div>
				{searchQuery !== "" &&
					(searchedUsers.length > 0 ? (
						<>
							<p className="font-semibold my-4 text-lg">Search Results</p>
							{searchedUsers.map((user) => (
								<div
									onClick={() => Navigate(`/profile/${user.id}`)}
									key={user.id}
									className="flex gap-2 my-2 border border-orange-500 items-center p-1 rounded-md w-72 cursor-pointer"
								>
									<img
										className="rounded-full h-10"
										src={user.profilePicture}
										alt="profile"
									/>
									<div>
										<p>{user.firstName + " " + user.lastName}</p>
										<p className="text-gray-400">@{user.username}</p>
									</div>
								</div>
							))}
						</>
					) : (
						notFound && (
							<p className="w-72 text-center my-4 font-semibold">
								No users found !
							</p>
						)
					))}
			</div>
		</div>
	);
};

export { SearchComponent };
