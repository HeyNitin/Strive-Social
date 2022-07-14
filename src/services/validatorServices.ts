const nameFormat = /^\S+\w{3,15}$/;
const mailformat = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
const passwordFormat = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;

export const nameValidator = (name: string) => nameFormat.test(name);

export const emailValidator = (email: string) => mailformat.test(email);

export const passwordValidator = (password: string) =>
	passwordFormat.test(password);
