import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faGithub,
	faTwitter,
	faLinkedin,
} from "@fortawesome/free-brands-svg-icons";

const Footer = (): JSX.Element => {
	return (
		<footer className="flex space-x-6 shadow-footer justify-center bg-white p-6 items-baseline dark:bg-darkCol">
			<a
				href="https://github.com/HeyNitin/Strive-Social"
				target="_blank"
				rel="noopener noreferrer"
			>
				<FontAwesomeIcon
					icon={faGithub}
					className="text-4xl dark:text-white dark:hover:text-slate-400 hover:text-slate-400"
				/>
			</a>
			<a
				href="https://twitter.com/07_Nitin_07"
				target="_blank"
				rel="noopener noreferrer"
			>
				<FontAwesomeIcon
					icon={faTwitter}
					className="text-4xl dark:text-white dark:hover:text-blue-400 hover:text-blue-400"
				/>
			</a>
			<a
				href="https://www.linkedin.com/in/heynitin/"
				target="_blank"
				rel="noopener noreferrer"
			>
				<FontAwesomeIcon
					icon={faLinkedin}
					className="text-4xl dark:text-white dark:hover:text-blue-600 hover:text-blue-600"
				/>
			</a>
		</footer>
	);
};

export { Footer };
