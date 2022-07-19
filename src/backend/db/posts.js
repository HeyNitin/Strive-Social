import { formatDate } from "../utils/authUtils";

/**
 * Posts can be added here.
 * You can add default posts of your wish with different attributes
 * */

export const posts = [
	{
		id: "101",
		content:
			"At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus. Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae. Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat.",
		likes: {
			likeCount: 2,
			likedBy: [
				{
					username: "cayahere",
					id: "104",
					firstName: "Jose",
					lastName: "Cayasso",
					profilePicture: "https://i.postimg.cc/rFsSLHwM/profile-caya.jpg",
				},
				{
					username: "naval",
					id: "102",
					firstName: "Naval",
					lastName: "Ravikant",
					profilePicture: "https://i.postimg.cc/RCDBg33G/profile-Naval.jpg",
				},
			],
		},
		comments: {
			commentCount: 1,
			commentedBy: [
				{
					username: "naval",
					id: "102",
					firstName: "Naval",
					lastName: "Ravikant",
					profilePicture: "https://i.postimg.cc/RCDBg33G/profile-Naval.jpg",
					comment: "So true",
					commentId: "101",
				},
			],
		},
		user: {
			username: "kunalb11",
			id: "103",
			firstName: "Kunal",
			lastName: "Shah",
			profilePicture: "https://i.postimg.cc/K8VfV2P6/profile-Kunal.jpg",
		},
		createdAt: "2022-06-26T01:00:38+05:30",
		updatedAt: formatDate(),
	},
	{
		id: "102",
		content:
			"At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus. Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae. Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat.",
		likes: {
			likeCount: 3,
			likedBy: [
				{
					username: "heynitin",
					id: "101",
					firstName: "Nitin",
					lastName: "Kalra",
					profilePicture: "https://i.postimg.cc/6p1n3fTn/profile-Nitin.jpg",
				},
				{
					username: "kunalb11",
					id: "103",
					firstName: "Kunal",
					lastName: "Shah",
					profilePicture: "https://i.postimg.cc/RCDBg33G/profile-Naval.jpg",
				},
				{
					username: "cayahere",
					id: "104",
					firstName: "Jose",
					lastName: "Cayasso",
					profilePicture: "https://i.postimg.cc/rFsSLHwM/profile-caya.jpg",
				},
			],
		},
		comments: {
			commentCount: 1,
			commentedBy: [
				{
					username: "heynitin",
					id: "101",
					firstName: "Nitin",
					lastName: "Kalra",
					profilePicture: "https://i.postimg.cc/6p1n3fTn/profile-Nitin.jpg",
					comment: "Yeah, this is absolutely corret",
					commentId: "101",
				},
			],
		},
		user: {
			username: "naval",
			id: "102",
			firstName: "Naval",
			lastName: "Ravikant",
			profilePicture: "https://i.postimg.cc/RCDBg33G/profile-Naval.jpg",
		},
		createdAt: "2022-06-29T01:00:38+05:30",
		updatedAt: formatDate(),
	},
	{
		id: "103",
		content:
			"At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus. Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae. Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat.",
		likes: {
			likeCount: 0,
			likedBy: [],
		},
		comments: {
			commentCount: 0,
			commentedBy: [],
		},
		user: {
			username: "heynitin",
			id: "101",
			firstName: "Nitin",
			lastName: "Kalra",
			profilePicture: "https://i.postimg.cc/6p1n3fTn/profile-Nitin.jpg",
		},
		createdAt: "2022-06-29T01:00:38+05:30",
		updatedAt: formatDate(),
	},
];
