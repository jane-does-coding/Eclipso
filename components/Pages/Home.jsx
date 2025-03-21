"use client";
import Image from "next/image";
import { FaPerson } from "react-icons/fa6";
import { CiGrid41, CiBoxList } from "react-icons/ci";
import { useEffect, useState } from "react";
import useRegisterModal from "../../app/hooks/useRegisterModal";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { LuLogOut } from "react-icons/lu";
import axios from "axios";
import challengesData from "../../data/challenges.json";

export default function Home({ currentUser }) {
	const [isListView, setIsListView] = useState(false);
	const [articles, setArticles] = useState([]);
	const [searchTerm, setSearchTerm] = useState("");
	const registerModal = useRegisterModal();
	const router = useRouter();
	const [streak, setStreak] = useState(0);
	const [challenge, setChallenge] = useState("");
	const [isChallengeModalOpen, setIsChallengeModalOpen] = useState(false);

	useEffect(() => {
		const todayIndex = new Date().getDate() % challengesData.challenges.length;
		setChallenge(challengesData.challenges[todayIndex]);
	}, []);

	useEffect(() => {
		if (currentUser?.id) {
			axios
				.get(`/api/streak/`)
				.then((res) => setStreak(res.data.streak))
				.catch((err) => console.error("Error fetching streak:", err));
		}
	}, [currentUser]);

	const fetchArticles = async (query = "") => {
		try {
			const res = await fetch(`/api/articles?query=${query}`);
			if (!res.ok) throw new Error("Failed to fetch articles");

			const data = await res.json();
			setArticles(data);
		} catch (error) {
			console.error(error);
		}
	};

	useEffect(() => {
		fetchArticles();
	}, []);

	const handleSearch = (e) => {
		e.preventDefault();
		fetchArticles(searchTerm);
	};

	const user = {
		name: currentUser.fullName,
		email: currentUser.email,
		goalDays: currentUser.goalDate,
		goalProgress: streak,
		streak: streak,
		completionRate: Math.round((streak / currentUser.goalDate) * 100),
		totalHabits: currentUser.habits.length,
		mostConsistentHabit: "nun",
	};

	if (!currentUser) {
		router.push("/login");
	} else {
		return (
			<div className="flex flex-col min-h-screen bg-[#262627] px-4 sm:px-6 md:px-8 text-white pb-[10vh]">
				{/* Header */}
				<div className="flex flex-col md:flex-row justify-between items-center w-full mx-auto md:w-[93vw] mt-[2rem]">
					<div className="flex flex-col text-center md:text-left">
						<h1 className="text-[3rem] sm:text-[4rem] md:text-[6rem] leading-[4rem] md:leading-[6rem] Flazie text-green-400 glowing-text">
							Eclipso
						</h1>
						<p className="text-neutral-100 text-lg sm:text-xl md:text-2xl Absans">
							Eclipso - Align Your Habits, Unlock Your Potential.
						</p>
					</div>
					<div className="flex  mt-4 sm:mt-0 sm:flex-col gap-4">
						<a
							href="/profile"
							className="text-neutral-200 flex gap-2 text-lg sm:text-[1.5rem] items-center justify-center Absans transition-all"
						>
							<FaPerson size={22} />
							Profile
						</a>
						<a
							className="text-neutral-200 flex gap-2 text-lg sm:text-[1.5rem] items-center justify-center Absans transition-all"
							onClick={() => signOut()}
						>
							<LuLogOut size={22} />
							Logout
						</a>
					</div>
				</div>

				{/* Boxes */}
				<div className="grid grid-cols-2 sm:grid-cols-4 w-full mx-auto gap-2 sm:gap-4 mt-6 sm:mt-8">
					{[
						user.streak + " Day Streak",
						user.goalDays + " Days Left",
						user.completionRate + "% Completed",
					].map((text, index) => (
						<div
							key={index}
							className="bg-neutral-700 p-4 sm:p-6 flex flex-col items-center justify-center rounded-md"
						>
							<h1 className="text-3xl sm:text-[2.75rem] font-bold Flazie">
								{text.split(" ")[0]}
							</h1>
							<p className="text-sm sm:text-lg">
								{text.split(" ").slice(1).join(" ")}
							</p>
						</div>
					))}
					<div
						className="bg-neutral-700 p-4 sm:p-6 flex flex-col items-center justify-center rounded-md cursor-pointer"
						onClick={() => setIsChallengeModalOpen(true)}
					>
						<h1 className="text-3xl sm:text-[2.75rem] font-bold Flazie flex flex-col items-center justify-center">
							Daily <span className="Absans text-sm md:text-lg">Challenge</span>
						</h1>
					</div>
				</div>
				{isChallengeModalOpen && (
					<div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-[9]">
						<div className="bg-neutral-800 p-6 pb-8 rounded-md text-center w-[35vw]">
							<h2 className="text-[2.5rem] font-bold Flazie">
								Today's Challenge
							</h2>
							<p className="mt-4 mb-6 text-[1.5rem] Absans">{challenge}</p>
							<div className="w-full flex gap-2">
								<button
									className="mt-4 px-4 py-2 bg-green-400 text-black Absans w-full rounded-md"
									onClick={() => setIsChallengeModalOpen(false)}
								>
									Close
								</button>
								<button
									className="mt-4 px-4 py-2 bg-green-400 text-black Absans w-full rounded-md"
									onClick={() => setIsChallengeModalOpen(false)}
								>
									Completed
								</button>
							</div>
						</div>
					</div>
				)}

				{/* Today's Entry */}
				<a
					href="/today"
					className="w-full flex items-center justify-center mt-6 relative"
				>
					<img
						src="/pattern7.png"
						className="h-[15vh] w-full rounded-md opacity-90"
					/>
					<h2 className="text-neutral-800 absolute text-3xl sm:text-5xl font-bold Absans">
						Today's Entry
					</h2>
				</a>

				{/* Search & Toggle Buttons */}
				<div className="flex flex-col sm:flex-row justify-between items-center w-full mx-auto mt-6 gap-4">
					<form onSubmit={handleSearch} className="w-full flex">
						<input
							type="text"
							placeholder="Search Articles..."
							value={searchTerm}
							onChange={(e) => setSearchTerm(e.target.value)}
							className="w-full bg-neutral-700 border-2 border-neutral-700 text-white px-4 py-2 rounded-l-full focus:ring-0 focus:outline-none focus:border-neutral-600"
						/>
						<button
							type="submit"
							className="bg-green-400 text-neutral-900 px-6 py-2 text-[1rem] rounded-r-full text-lg font-semibold hover:bg-green-500 transition"
						>
							Search
						</button>
					</form>

					{/* Toggle Button (List/Grid) */}
					<button
						onClick={() => setIsListView(!isListView)}
						className="bg-neutral-800 px-4 py-2 flex items-center gap-2 rounded-md border border-neutral-700 transition hover:bg-neutral-700 min-w-fit"
					>
						{isListView ? <CiGrid41 size={25} /> : <CiBoxList size={25} />}
						<span>{isListView ? "Grid View" : "List View"}</span>
					</button>
				</div>

				{/* Articles */}
				<div className="mt-8">
					{articles.length > 0 ? (
						<div
							className={`grid ${
								isListView ? "grid-cols-1" : "grid-cols-2 sm:grid-cols-3"
							} gap-4`}
						>
							{articles.map((article, index) => (
								<div key={index} className="bg-neutral-700 rounded-md p-4">
									<a
										href={article.url}
										target="_blank"
										rel="noopener noreferrer"
										className="text-lg text-neutral-100 hover:underline"
									>
										{article.title}
									</a>
								</div>
							))}
						</div>
					) : (
						<p className="text-center text-gray-400">No articles found.</p>
					)}
				</div>
			</div>
		);
	}
}
