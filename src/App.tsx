import { Counter } from "features/counter/Counter";
import { ToastContainer } from "react-toastify";

function App() {
	return (
		<div className="App">
			<ToastContainer />
			<Counter />
		</div>
	);
}

export default App;
