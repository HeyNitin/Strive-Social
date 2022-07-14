import { formatDate } from "../utils/authUtils";
/**
 * User Database can be added here.
 * You can add default users of your wish with different attributes
 * */

export const users = [
	{
		id: 101,
		firstName: "Nitin",
		lastName: "Kalra",
		username: "heynitin",
		password: "justfortest",
		following: ["naval", "jalebifafda"],
		followers: ["naval", "kunalb11", "cayahere"],
		profilePicture: "https://i.postimg.cc/6p1n3fTn/profile-Nitin.jpg",
		createdAt: formatDate(),
		updatedAt: formatDate(),
	},
	{
		id: 102,
		firstName: "Naval",
		lastName: "Ravikant",
		username: "naval",
		password: "creativejobs",
		following: ["heynitin", "cayahere"],
		followers: ["heynitin"],
		profilePicture: "https://i.postimg.cc/RCDBg33G/profile-Naval.jpg",
		createdAt: formatDate(),
		updatedAt: formatDate(),
	},
	{
		id: 103,
		firstName: "Kunal",
		lastName: "Shah",
		username: "kunalb11",
		password: "realityisamyth",
		following: ["heynitin", "cayahere"],
		followers: [],
		profilePicture: "https://i.postimg.cc/K8VfV2P6/profile-Kunal.jpg",
		createdAt: formatDate(),
		updatedAt: formatDate(),
	},
	{
		id: 104,
		firstName: "Jose",
		lastName: "cayasso",
		username: "cayahere",
		password: "slidebeanforthewin",
		following: ["heynitin"],
		followers: ["naval", "kunalb11"],
		profilePicture: "https://i.postimg.cc/rFsSLHwM/profile-caya.jpg",
		createdAt: formatDate(),
		updatedAt: formatDate(),
	},
	{
		id: 105,
		firstName: "John",
		lastName: "Cena",
		username: "youcantreadthis",
		password: "youcanttypethis",
		following: [],
		followers: [],
		profilePicture: "https://i.postimg.cc/3xMWbfyL/profile-John.jpg",
		createdAt: formatDate(),
		updatedAt: formatDate(),
	},
	{
		id: 106,
		firstName: "Jethalal",
		lastName: "Gada",
		username: "jalebifafda",
		password: "chaipiyobiscuitkhao",
		following: [],
		followers: ["heynitin"],
		profilePicture: "https://i.postimg.cc/bJGsB7RB/profile-Jhetha.jpg",
		createdAt: formatDate(),
		updatedAt: formatDate(),
	},
	{
		id: 107,
		firstName: "Nobita",
		lastName: "Nobi",
		username: "doremonadmirer",
		password: "givemegadget",
		following: ["doremon"],
		followers: [],
		profilePicture: "https://i.postimg.cc/brW050bQ/profile-Nobita.jpg",
		createdAt: formatDate(),
		updatedAt: formatDate(),
	},
	{
		id: 108,
		firstName: "Doremon",
		lastName: "The Robot",
		username: "doremon",
		password: "nobitasgod",
		following: [],
		followers: ["doremonadmirer"],
		profilePicture: "https://i.postimg.cc/DzX9p5Xc/profile-Doremon.jpg",
		createdAt: formatDate(),
		updatedAt: formatDate(),
	},
];
