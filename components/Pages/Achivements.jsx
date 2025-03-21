"use client";
import React, { useEffect, useState } from "react";
import { FaMedal } from "react-icons/fa";
import axios from "axios";
import { signOut } from "next-auth/react";
import { FaPerson } from "react-icons/fa6";
import { LuLogOut } from "react-icons/lu";
import { FaChevronLeft } from "react-icons/fa";
import { PiMedalDuotone } from "react-icons/pi";
import { FaTrophy } from "react-icons/fa6";

const Achievements = ({ achivementsProp }) => {
	const [achievements, setAchievements] = useState(achivementsProp);
	console.log(achievements);

	return (
		<div className="p-6  min-h-screen bg-neutral-800">
			<div className="flex flex-row items-center w-full mx-auto md:w-[93vw] mt-[2rem] md:mt-[1rem]">
				<button
					className="text-neutral-200 text-[1.25rem] sm:text-[1.5rem] flex items-center Absans"
					onClick={() => router.push("/")}
				>
					<FaChevronLeft size={22} /> Back
				</button>
			</div>

			<div className="flex flex-col md:flex-row justify-between items-center w-full mx-auto md:w-[93vw] mt-[2rem]">
				<div className="flex flex-col text-center md:text-left">
					<h1 className="text-[3rem] sm:text-[4rem] md:text-[5.5rem] leading-[4rem] md:leading-[5.5rem] Flazie text-green-400 glowing-text">
						Achievements
					</h1>
					<p className="text-neutral-100 text-lg sm:text-xl md:text-2xl Absans">
						Track your progress, and what you achieve
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
			<br />

			<div className="px-8">
				<h2 className="text-neutral-200 Absans mb-4 text-[1.5rem]">Achieved</h2>
				<div className="grid grid-cols-5 gap-6 mb-12">
					<div className="w-full relative flex items-center justify-center">
						<h2 className="absolute text-neutral-300 z-[10] text-[5rem]">
							<PiMedalDuotone />
						</h2>
						<img src="/circle.png" className="opacity-80" alt="" />
					</div>
					<div className="w-full relative flex items-center justify-center">
						<h2 className="absolute text-neutral-300 z-[10] text-[5rem]">
							<FaTrophy />
						</h2>
						<img src="/circle.png" className="opacity-80" alt="" />
					</div>
				</div>

				<h2 className="text-neutral-200 Absans mb-4 text-[1.5rem]">
					Other Achievements
				</h2>
				<div className="grid grid-cols-5 gap-6">
					<div className="w-full opacity-60 flex items-center justify-center relative">
						<h2 className="absolute text-black z-[10] text-[3rem]">L</h2>
						<img src="/circle.png" className="opacity-80" alt="" />
					</div>
					<div className="w-full opacity-60 flex items-center justify-center relative">
						<h2 className="absolute text-black z-[10] text-[3rem]">L</h2>
						<img src="/circle.png" className="opacity-80" alt="" />
					</div>
				</div>
			</div>

			<div className="grid grid-cols-2 gap-4">
				{achievements != null &&
					achievements.map((achievement) => (
						<div
							key={achievement.id}
							className={`flex items-center p-4 border rounded-lg shadow-md ${
								achievement.achieved ? "bg-blue-100" : "bg-gray-200 opacity-80"
							}`}
						>
							<FaMedal
								className={`text-2xl ${
									achievement.achieved ? "text-yellow-500" : "text-gray-400"
								}`}
							/>
							<span className="ml-3 font-medium">{achievement.name}</span>
						</div>
					))}
			</div>
		</div>
	);
};

export default Achievements;
