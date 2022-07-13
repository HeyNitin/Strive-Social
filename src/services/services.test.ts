import {
	nameValidator,
	emailValidator,
	passwordValidator,
} from "services/validatorServices";

describe("Testing Name validator", () => {
	test("Testing wrong format", () => {
		let name = "Nitin";
		let result = nameValidator(name);

		expect(result).toBe(false);
	});
	test("Testing correct format", () => {
		let name = "Nitin Kalra";
		let result = nameValidator(name);

		expect(result).toBe(true);
	});
});

describe("Testing Email validator", () => {
	test("Testing wrong format", () => {
		let email = "Nitin$gmail.com";
		let result = emailValidator(email);

		expect(result).toBe(false);
	});
	test("Testing correct format", () => {
		let email = "Nitin@StriveSocial.com";
		let result = emailValidator(email);

		expect(result).toBe(true);
	});
});

describe("Testing password validator", () => {
	test("Testing wrong format", () => {
		let password = "Nitin";
		let result = passwordValidator(password);

		expect(result).toBe(false);
	});
	test("Testing correct format", () => {
		let password = "Password12@";
		let result = passwordValidator(password);

		expect(result).toBe(true);
	});
});
