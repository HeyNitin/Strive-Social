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
		following: ["naval"],
		createdAt: formatDate(),
		updatedAt: formatDate(),
	},
	{
		id: 102,
		firstName: "Naval",
		lastName: "Ravikant",
		username: "naval",
		password: "creativejobs",
		following: [],
		createdAt: formatDate(),
		updatedAt: formatDate(),
	},
	{
		id: 103,
		firstName: "Kunal",
		lastName: "Shah",
		username: "kunalb11",
		password: "realityisamyth",
		following: [],
		createdAt: formatDate(),
		updatedAt: formatDate(),
	},
	{
		id: 104,
		firstName: "Jose",
		lastName: "cayasso",
		username: "cayahere",
		password: "slidebeanforthewin",
		following: [],
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
		createdAt: formatDate(),
		updatedAt: formatDate(),
	},
	{
		id: 107,
		firstName: "Nobita",
		lastName: "Nobi",
		username: "doremonadmirer",
		password: "givemegadget",
		following: [],
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
		createdAt: formatDate(),
		updatedAt: formatDate(),
	},
];
