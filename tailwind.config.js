/** @type {import('tailwindcss').Config} */

module.exports = {
	content: ["./src/**/*.{js,jsx,ts,tsx}"],
	darkMode: "class",
	theme: {
		extend: {
			boxShadow: {
				footer: "0px 0px 8px 0px rgba(0, 0, 0, 0.3)",
				card: "0px 0px 8px 0px rgba(0, 0, 0, 0.3)",
			},
			colors: {
				primary: "#92FCDB",
				primaryLight: "#CBFEEE",
				primaryDark: "#18CBAF",

				darker: "rgb(43, 42, 51)",
				darkCol: "#37343E",
				darkLight: "rgba(66, 65, 77, 1)",
			},
		},
	},
	plugins: [],
};
