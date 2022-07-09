import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

type toastTypes = {
	success: string;
	error: string;
	info: string;
	warn: string;
};

const showToast = (type: string, message: string) => {
	toast[type as keyof toastTypes](message, {
		position: "top-right",
		autoClose: 2000,
		hideProgressBar: false,
		closeOnClick: true,
		pauseOnHover: true,
		draggable: true,
	});
};

export { showToast };
