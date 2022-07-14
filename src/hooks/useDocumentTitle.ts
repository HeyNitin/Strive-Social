import { useEffect } from "react";

const useDocumentTitle = (title: string) => {
	useEffect(() => {
		document.title = `Strive Social || ${title}`;
	}, [title]);
};

export { useDocumentTitle };
