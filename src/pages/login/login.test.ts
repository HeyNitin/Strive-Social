import { loginReducer } from "pages/login/loginReducer";

describe("Testing login reducer", () => {
	const initialValue = {
		userName: "",
		password: "",
		errorMsg: "",
		error: false,
		rememberMe: false,
		defaultCredentials: false,
	};

	test("Testing case Username", () => {
		let expectedState = {
			userName: "HeyNitin",
			password: "",
			errorMsg: "",
			error: false,
			rememberMe: false,
			defaultCredentials: false,
		};

		let state = loginReducer(initialValue, {
			type: "UserName",
			payload: "HeyNitin",
		});

		expect(state).toEqual(expectedState);
	});

	test("Testing case Password", () => {
		let expectedState = {
			userName: "",
			password: "justfortest",
			errorMsg: "",
			error: false,
			rememberMe: false,
			defaultCredentials: false,
		};

		let state = loginReducer(initialValue, {
			type: "Password",
			payload: "justfortest",
		});

		expect(state).toEqual(expectedState);
	});
	test("Testing case RememberMe", () => {
		let expectedState = {
			userName: "",
			password: "",
			errorMsg: "",
			error: false,
			rememberMe: true,
			defaultCredentials: false,
		};

		let state = loginReducer(initialValue, {
			type: "RememberMe",
			payload: true,
		});

		expect(state).toEqual(expectedState);
	});
	test("Testing case Error", () => {
		let expectedState = {
			userName: "",
			password: "",
			errorMsg: "Error Occured",
			error: true,
			rememberMe: false,
			defaultCredentials: false,
		};

		let state = loginReducer(initialValue, {
			type: "Error",
			payload: "Error Occured",
		});

		expect(state).toEqual(expectedState);
	});
	test("Testing case Default credentials", () => {
		let expectedState = {
			userName: "HeyNitin",
			password: "justfortest",
			errorMsg: "",
			error: false,
			rememberMe: false,
			defaultCredentials: true,
		};

		let state = loginReducer(initialValue, {
			type: "DefaultCredentials",
			payload: true,
		});

		expect(state).toEqual(expectedState);
	});
});
