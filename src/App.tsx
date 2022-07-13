import { ToastContainer } from "react-toastify";
import { Routes } from "components/routes/routes";
import { Header } from "components/header/header";
import { useState } from "react";

function App() {
	const [darkMode, setDarkMode] = useState<Boolean>(false);

	return (
		<div className={`${darkMode && "dark"}  App`}>
			<Header darkMode={darkMode} setDarkMode={setDarkMode} />
			<ToastContainer />
			<Routes />
		</div>
	);
}

export default App;
