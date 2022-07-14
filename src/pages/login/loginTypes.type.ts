export type loginActionTypes =
	| {
			type: "UserName";
			payload: string;
	  }
	| {
			type: "Password";
			payload: string;
	  }
	| {
			type: "RememberMe";
			payload: boolean;
	  }
	| {
			type: "Error";
			payload: string;
	  }
	| {
			type: "DefaultCredentials";
			payload: boolean;
	  };

export type loginInitialValueTypes = {
	userName: string;
	password: string;
	errorMsg: string;
	error: boolean;
	rememberMe: boolean;
	defaultCredentials: boolean;
};
