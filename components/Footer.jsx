import {
	FaLinkedin,
	FaDribbble,
	FaDev,
	FaCode,
	FaGithub,
} from "react-icons/fa";
import { SiGithubsponsors } from "react-icons/si";

const Footer = () => {
	return (
		<footer className="bg-neutral-900/[97%] border-t-2 border-t-neutral-900 text-white py-6 text-center flex flex-col items-center gap-4">
			<p className="text-sm flex flex-row">
				Made with <SiGithubsponsors size={20} className="text-green-500 mx-2" />
				by jane-does-coding
			</p>
			<div className="flex gap-6 text-2xl">
				<a
					href="https://www.linkedin.com/in/yevheniia-simaka/"
					target="_blank"
					rel="noopener noreferrer"
				>
					<FaLinkedin className="hover:text-blue-500 transition" />
				</a>
				<a
					href="https://www.dribbble.com/in/yevheniia-simaka/"
					target="_blank"
					rel="noopener noreferrer"
				>
					<FaDribbble className="hover:text-pink-500 transition" />
				</a>
				<a
					href="https://devpost.com/I-am-jane"
					target="_blank"
					rel="noopener noreferrer"
				>
					<FaDev className="hover:text-sky-400 transition" />
				</a>
				<a
					href="https://leetcode.com/u/jane-does-coding/"
					target="_blank"
					rel="noopener noreferrer"
				>
					<FaCode className="hover:text-yellow-500 transition" />
				</a>
				<a
					href="https://github.com/jane-does-coding"
					target="_blank"
					rel="noopener noreferrer"
				>
					<FaGithub className="hover:text-gray-500 transition" />
				</a>
			</div>
		</footer>
	);
};

export default Footer;
