import { Footer } from "components/footer/footer";
import { useNavigate } from "react-router-dom";

const Homepage = (): JSX.Element => {
	const Navigate = useNavigate();
	return (
		<div className=" min-h-[calc(100vh-5rem)] flex flex-col">
			<div className="grid sm:grid-cols-2 min-h-[calc(100vh-12rem)] items-center">
				<div className="flex flex-col items-center">
					<p className="text-3xl mb-12">
						<span className="text-orange-500 font-semibold">Strive</span> Social
					</p>
					<div className="flex flex-col gap-2">
						<p>
							<span className="text-2xl text-gray-400">Follow</span> poeple
							around the globe
						</p>
						<p>
							<span className="text-2xl text-gray-400">Connect</span> with your
							friends
						</p>
						<p>
							<span className="text-2xl text-gray-400">Share</span> what you're
							thinking
						</p>
					</div>
					<button
						onClick={() => Navigate("/login")}
						className="mt-12 text-white bg-orange-600 w-72 p-1"
					>
						Join Now
					</button>
					<p
						onClick={() => Navigate("/signup")}
						className="cursor-pointer mt-2 text-orange-500"
					>
						Already have an accout?
					</p>
				</div>
				<div className="hidden sm:block p-4">
					<img
						src="https://i.postimg.cc/wTZ41mnQ/social-media.png"
						alt="hero"
					/>
				</div>
			</div>
			<div className="mt-auto">
				<Footer />
			</div>
		</div>
	);
};

export { Homepage };
