import { Response } from "miragejs";
import { formatDate, requiresAuth } from "../utils/authUtils";

/**
 * All the routes related to user are present here.
 * */

/**
 * This handler handles gets all users in the db.
 * send GET Request at /api/users
 * */

export const getAllUsersHandler = function () {
	return new Response(200, {}, { users: this.db.users });
};

/**
 * This handler handles get a user from userId in the db.
 * send GET Request at /api/users/:userId
 * */

export const getUserHandler = function (schema, request) {
	const userId = request.params.userId;
	try {
		const user = schema.users.findBy({ id: userId }).attrs;
		return new Response(200, {}, { user });
	} catch (error) {
		return new Response(
			500,
			{},
			{
				error,
			}
		);
	}
};

/**
 * This handler handles updating user details.
 * send POST Request at /api/users/edit
 * body contains { userData }
 * */

export const editUserHandler = function (schema, request) {
	let user = requiresAuth.call(this, request);
	try {
		if (!user) {
			return new Response(
				404,
				{},
				{
					errors: [
						"The username you entered is not Registered. Not Found error",
					],
				}
			);
		}
		const { userData } = JSON.parse(request.requestBody);
		user = { ...user, ...userData, updatedAt: formatDate() };
		this.db.users.update({ id: user.id }, user);
		return new Response(201, {}, { user });
	} catch (error) {
		return new Response(
			500,
			{},
			{
				error,
			}
		);
	}
};

/**
 * This handler gets all the user bookmarks from the db.
 * send GET Request at /api/users/bookmark/
 * */

export const getBookmarkPostsHandler = function (schema, request) {
	const user = requiresAuth.call(this, request);
	try {
		if (!user) {
			return new Response(
				404,
				{},
				{
					errors: [
						"The username you entered is not Registered. Not Found error",
					],
				}
			);
		}
		return new Response(200, {}, { bookmarks: user.bookmarks });
	} catch (error) {
		return new Response(
			500,
			{},
			{
				error,
			}
		);
	}
};
/**
 * This handler handles adding a post to user's bookmarks in the db.
 * send POST Request at /api/users/bookmark/:postId/
 * */

export const bookmarkPostHandler = function (schema, request) {
	const { postId } = request.params;
	const post = schema.posts.findBy({ id: postId }).attrs;
	const user = requiresAuth.call(this, request);
	try {
		if (!user) {
			return new Response(
				404,
				{},
				{
					errors: [
						"The username you entered is not Registered. Not Found error",
					],
				}
			);
		}
		const isBookmarked = user.bookmarks.some(
			(currPost) => currPost.id === postId
		);
		if (isBookmarked) {
			return new Response(
				400,
				{},
				{ errors: ["This Post is already bookmarked"] }
			);
		}
		user.bookmarks.push(post);
		this.db.users.update({ id: user.id }, { ...user, updatedAt: formatDate() });
		return new Response(200, {}, { bookmarks: user.bookmarks });
	} catch (error) {
		return new Response(
			500,
			{},
			{
				error,
			}
		);
	}
};

/**
 * This handler handles removing a post to user's bookmarks in the db.
 * send POST Request at /api/users/remove-bookmark/:postId/
 * */

export const removePostFromBookmarkHandler = function (schema, request) {
	const { postId } = request.params;
	let user = requiresAuth.call(this, request);
	try {
		if (!user) {
			return new Response(
				404,
				{},
				{
					errors: [
						"The username you entered is not Registered. Not Found error",
					],
				}
			);
		}
		const isBookmarked = user.bookmarks.some(
			(currPost) => currPost.id === postId
		);
		if (!isBookmarked) {
			return new Response(400, {}, { errors: ["Post not bookmarked yet"] });
		}
		const filteredBookmarks = user.bookmarks.filter(
			(currPost) => currPost.id !== postId
		);
		user = { ...user, bookmarks: filteredBookmarks };
		this.db.users.update({ id: user.id }, { ...user, updatedAt: formatDate() });
		return new Response(200, {}, { bookmarks: user.bookmarks });
	} catch (error) {
		return new Response(
			500,
			{},
			{
				error,
			}
		);
	}
};

/**
 * This handler handles follow action.
 * send POST Request at /api/users/follow/:followUserId/
 * */

export const followUserHandler = function (schema, request) {
	const user = requiresAuth.call(this, request);
	const { followUserId } = request.params;
	const followUser = schema.users.findBy({ id: followUserId }).attrs;
	try {
		if (!user) {
			return new Response(
				404,
				{},
				{
					errors: [
						"The username you entered is not Registered. Not Found error",
					],
				}
			);
		}
		const isFollowing = user.following.some(
			(currUser) => currUser.id === followUser.id
		);

		if (isFollowing) {
			return new Response(400, {}, { errors: ["User Already following"] });
		}

		const updatedUser = {
			...user,
			following: [
				...user.following,
				{
					username: followUser.username,
					firstName: followUser.firstName,
					lastName: followUser.lastName,
					profilePicture: followUser.profilePicture,
					id: followUser.id,
				},
			],
		};
		const updatedFollowUser = {
			...followUser,
			followers: [
				...followUser.followers,
				{
					username: user.username,
					firstName: user.firstName,
					lastName: user.lastName,
					profilePicture: user.profilePicture,
					id: user.id,
				},
			],
		};
		this.db.users.update(
			{ id: user.id },
			{ ...updatedUser, updatedAt: formatDate() }
		);
		this.db.users.update(
			{ id: followUser.id },
			{ ...updatedFollowUser, updatedAt: formatDate() }
		);
		return new Response(
			200,
			{},
			{ user: updatedUser, followUser: updatedFollowUser }
		);
	} catch (error) {
		return new Response(
			500,
			{},
			{
				error,
			}
		);
	}
};

/**
 * This handler handles unfollow action.
 * send POST Request at /api/users/unfollow/:followUserId/
 * */

export const unfollowUserHandler = function (schema, request) {
	const user = requiresAuth.call(this, request);
	const { followUserId } = request.params;
	const followUser = this.db.users.findBy({ id: followUserId });
	try {
		if (!user) {
			return new Response(
				404,
				{},
				{
					errors: [
						"The username you entered is not Registered. Not Found error",
					],
				}
			);
		}
		const isFollowing = user.following.some(
			(currUser) => currUser.id === followUser.id
		);

		if (!isFollowing) {
			return new Response(400, {}, { errors: ["User already not following"] });
		}

		const updatedUser = {
			...user,
			following: user.following.filter(
				(currUser) => currUser.id !== followUser.id
			),
		};
		const updatedFollowUser = {
			...followUser,
			followers: followUser.followers.filter(
				(currUser) => currUser.id !== user.id
			),
		};
		this.db.users.update(
			{ id: user.id },
			{ ...updatedUser, updatedAt: formatDate() }
		);
		this.db.users.update(
			{ id: followUser.id },
			{ ...updatedFollowUser, updatedAt: formatDate() }
		);
		return new Response(
			200,
			{},
			{ user: updatedUser, followUser: updatedFollowUser }
		);
	} catch (error) {
		return new Response(
			500,
			{},
			{
				error,
			}
		);
	}
};
