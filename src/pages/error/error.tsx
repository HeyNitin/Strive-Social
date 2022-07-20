import { useDocumentTitle } from "hooks/useDocumentTitle";

const Error = (): JSX.Element => {

	useDocumentTitle("Error")

	return <div>This is Error</div>;
};

export { Error };
