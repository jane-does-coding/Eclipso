"use client";
import { FaChevronLeft } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Today() {
	const router = useRouter();
	const [completionRate, setCompletionRate] = useState(75);
	const habits = ["Exercise", "Read", "Meditate", "Journal"];
	const completedHabits = [true, false, true, false];
	const calendarData = [80, 50, 100, 30, 60, 90, 20, 40, 70, 50];

	return (
		<div className="flex flex-col bg-[#262627] min-h-screen px-4 sm:px-6 md:px-8 pb-[15vh]">
			{/* Header */}
			<div className="flex flex-row items-center w-full mx-auto md:w-[93vw] mt-[2rem] md:mt-[2rem]">
				<button
					className="text-neutral-200 text-[1.25rem] sm:text-[1.5rem] flex items-center Absans"
					onClick={() => router.push("/")}
				>
					<FaChevronLeft size={22} /> Back
				</button>
			</div>

			<div className="flex flex-col items-center mt-4">
				<h1 className="text-[3rem] sm:text-[4rem] md:text-[6rem] Flazie text-green-400 glowing-text text-center">
					Today
				</h1>
			</div>

			{/* Progress and Habits */}
			<div className="flex flex-col md:flex-row justify-center items-center mt-8 gap-8 md:gap-[6vw]">
				{/* Progress Circle */}
				<div className="relative w-[250px] h-[250px] sm:w-[300px] sm:h-[300px]">
					<svg
						className="absolute top-0 left-0 w-full h-full"
						viewBox="0 0 100 100"
					>
						<circle
							cx="50"
							cy="50"
							r="40"
							stroke="#444"
							strokeWidth="8"
							fill="none"
						/>
						<circle
							cx="50"
							cy="50"
							r="40"
							stroke="oklch(0.704 0.191 22.216)"
							strokeWidth="8"
							fill="none"
							strokeDasharray="251.2"
							strokeDashoffset={251.2 - (completionRate / 100) * 251.2}
							strokeLinecap="round"
							className="transition-all duration-500"
						/>
					</svg>
					<div className="absolute inset-0 flex items-center justify-center text-white Flazie text-[2rem] sm:text-[2.5rem]">
						{completionRate}%
					</div>
				</div>

				{/* Habit Checklist */}
				<div className="flex flex-col p-4 rounded-md w-[250px] sm:w-[300px]">
					<h2 className="text-white Absans text-[1.5rem] mb-2">
						Today's Habits
					</h2>
					{habits.map((habit, index) => (
						<div
							key={index}
							className="flex items-center gap-2 text-white text-[1.5rem] mb-1 Absans"
						>
							<div className="w-4 h-4 bg-neutral-700 rounded-full"></div>
							{habit}
						</div>
					))}
				</div>
			</div>

			{/* Calendar Progress */}
			<div className="flex justify-center mt-12">
				<div className="grid grid-cols-7 gap-3 sm:gap-4 gap-y-14 sm:gap-y-14">
					{calendarData.map((completion, index) => (
						<div
							key={index}
							className="w-18 h-18 flex flex-col items-center relative"
						>
							<div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-neutral-600 relative overflow-hidden">
								<div
									className="absolute bottom-0 left-0 w-full bg-green-400"
									style={{ height: `${completion}%` }}
								></div>
							</div>
							<span className="text-white Absans text-[0.9rem] sm:text-[1rem] absolute top-[2.5rem] sm:top-[3rem]">
								{index + 1}
							</span>
						</div>
					))}
				</div>
			</div>
		</div>
	);
}
