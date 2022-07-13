import { signupRedcuer } from "pages/signup/signupReducer";

let initialValue = {
	firstName: "",
	lastName: "",
	userName: "",
	email: "",
	password: "",
	confirmPassword: "",
	errorMsg: "",
	error: false,
	tnc: false,
};

describe("Testing signup reducer", () => {
	test("testing first name case", () => {
		let expectedValue = {
			firstName: "Nitin",
			lastName: "",
			userName: "",
			email: "",
			password: "",
			confirmPassword: "",
			errorMsg: "",
			error: false,
			tnc: false,
		};

		let state = signupRedcuer(initialValue, {
			type: "FirstName",
			payload: "Nitin",
		});

		expect(state).toEqual(expectedValue);
	});
	test("testing last name case", () => {
		let expectedValue = {
			firstName: "",
			lastName: "kalra",
			userName: "",
			email: "",
			password: "",
			confirmPassword: "",
			errorMsg: "",
			error: false,
			tnc: false,
		};

		let state = signupRedcuer(initialValue, {
			type: "LastName",
			payload: "kalra",
		});

		expect(state).toEqual(expectedValue);
	});
	test("testing Usernname case", () => {
		let expectedValue = {
			firstName: "",
			lastName: "",
			userName: "HeyNitin",
			email: "",
			password: "",
			confirmPassword: "",
			errorMsg: "",
			error: false,
			tnc: false,
		};

		let state = signupRedcuer(initialValue, {
			type: "UserName",
			payload: "HeyNitin",
		});

		expect(state).toEqual(expectedValue);
	});
	test("testing email case", () => {
		let expectedValue = {
			firstName: "",
			lastName: "",
			userName: "",
			email: "nikkalra88@gmail.com",
			password: "",
			confirmPassword: "",
			errorMsg: "",
			error: false,
			tnc: false,
		};

		let state = signupRedcuer(initialValue, {
			type: "E-mail",
			payload: "nikkalra88@gmail.com",
		});

		expect(state).toEqual(expectedValue);
	});
	test("testing password case", () => {
		let expectedValue = {
			firstName: "",
			lastName: "",
			userName: "",
			email: "",
			password: "justfortest",
			confirmPassword: "",
			errorMsg: "",
			error: false,
			tnc: false,
		};

		let state = signupRedcuer(initialValue, {
			type: "Password",
			payload: "justfortest",
		});

		expect(state).toEqual(expectedValue);
	});
	test("testing confirm password case", () => {
		let expectedValue = {
			firstName: "",
			lastName: "",
			userName: "",
			email: "",
			password: "",
			confirmPassword: "justfortest",
			errorMsg: "",
			error: false,
			tnc: false,
		};

		let state = signupRedcuer(initialValue, {
			type: "ConfirmPassword",
			payload: "justfortest",
		});

		expect(state).toEqual(expectedValue);
	});
	test("testing Tnc case", () => {
		let expectedValue = {
			firstName: "",
			lastName: "",
			userName: "",
			email: "",
			password: "",
			confirmPassword: "",
			errorMsg: "",
			error: false,
			tnc: true,
		};

		let state = signupRedcuer(initialValue, {
			type: "Tnc",
			payload: true,
		});

		expect(state).toEqual(expectedValue);
	});
	test("testing error case ", () => {
		let expectedValue = {
			firstName: "",
			lastName: "",
			userName: "",
			email: "",
			password: "",
			confirmPassword: "",
			errorMsg: "Error occured",
			error: true,
			tnc: false,
		};

		let state = signupRedcuer(initialValue, {
			type: "Error",
			payload: "Error occured",
		});

		expect(state).toEqual(expectedValue);
	});
});
