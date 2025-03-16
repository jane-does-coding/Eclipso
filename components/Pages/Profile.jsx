"use client";
import { useState } from "react";
import { FaChevronLeft } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { IoIosInformationCircleOutline } from "react-icons/io";
import useHabitModal from "../../app/hooks/useHabitModal";

const CircularProgress = ({ value }) => {
	const radius = 40;
	const circumference = 2 * Math.PI * radius;
	const offset =
		circumference - (Math.min(Math.max(value, 0), 100) / 100) * circumference;

	return (
		<div className="relative w-[250px] h-[250px] sm:w-[300px] sm:h-[300px]">
			<svg
				className="absolute top-0 left-0 w-full h-full"
				viewBox="0 0 100 100"
			>
				<circle
					cx="50"
					cy="50"
					r={radius}
					stroke="#444"
					strokeWidth="8"
					fill="none"
				/>
				<circle
					cx="50"
					cy="50"
					r={radius}
					stroke="oklch(0.704 0.191 22.216)"
					strokeWidth="8"
					fill="none"
					strokeDasharray={circumference}
					strokeDashoffset={offset}
					strokeLinecap="round"
				/>
				<text
					x="50"
					y="55"
					textAnchor="middle"
					fill="#FFFFFF"
					fontSize="20px"
					fontWeight="bold"
					className="Flazie"
				>
					{value}%
				</text>
			</svg>
		</div>
	);
};

const ProfilePage = ({ currentUser }) => {
	const router = useRouter();
	const [habits, setHabits] = useState(currentUser.habits || []);
	const [isStreakInfo, setIsStreakInfo] = useState(false);
	const habitModal = useHabitModal();

	const toggleHabit = async (id) => {
		const habit = habits.find((h) => h.id === id);
		const updatedHabit = { ...habit, completed: !habit.completed };
		console.log("idk what im doing: ");
		console.log(updatedHabit);

		// Update the habit in the database
		const response = await fetch(`/api/habits/index/${id}`, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ completed: updatedHabit.completed }),
		});

		if (response.ok) {
			setHabits(habits.map((h) => (h.id === id ? updatedHabit : h)));
		}
	};

	const user = {
		name: currentUser.fullName,
		email: currentUser.email,
		avatar: "/avatar.png",
		goalDays: currentUser.goalDate,
		goalProgress: 10, // This should ideally come from the database
		streak: 22, // This should ideally come from the database
		completionRate: 85, // This should ideally come from the database
		totalHabits: currentUser.habits.length,
		mostConsistentHabit: "Morning Run", // This should ideally come from the database
	};

	return (
		<div className="flex flex-col bg-[#262627] min-h-screen sm:px-6 text-white pb-[10vh] md:px-[10vw]">
			{/* Header */}
			<div className="flex flex-row items-center w-full mx-auto mt-[2rem] pl-4">
				<button
					className="text-neutral-200 text-[1.25rem] sm:text-[1.5rem] flex items-center Absans"
					onClick={() => router.push("/")}
				>
					<FaChevronLeft size={22} /> Back
				</button>
			</div>

			<h1 className="text-[3rem] sm:text-[4rem] md:text-[6rem] Flazie text-rose-300 glowing-text text-center">
				Profile
			</h1>
			{/* User Info */}
			<div className="flex flex-col sm:flex-row items-center justify-center gap-2 md:gap-[5vw]">
				<div className="flex flex-col items-center mt-4">
					<div className="flex items-center gap-4 mt-4">
						<div className="text-center">
							<h2 className="text-[2rem] font-bold Absans">{user.name}</h2>
							<p className="text-gray-400 text-[1.25rem] Absans">
								{user.email}
							</p>
						</div>
					</div>
				</div>

				{/* Goal Progress */}
				<div className="mt-6 text-center">
					<h3 className="text-[2rem] font-semibold Absans">Current Goal</h3>
					<p className="text-gray-400 text-[1.25rem] Absans">
						{user.goalProgress}/{user.goalDays} days completed
					</p>
				</div>
			</div>
			<div className="flex justify-center mt-4">
				<CircularProgress
					value={Math.round((user.goalProgress / user.goalDays) * 100)}
				/>
			</div>

			{/* Habit List */}
			<div className="mt-6 px-4 sm:px-0">
				<h3 className="text-lg font-semibold Absans">Daily Habits</h3>
				<ul className="mt-2 space-y-3">
					{habits.map((habit) => (
						<li
							key={habit.id}
							className="flex items-center justify-between bg-neutral-700 p-3 px-8 rounded-lg"
						>
							<span
								className={`Absans text-[1.5rem] ${
									habit.completed ? "line-through text-gray-500" : ""
								}`}
							>
								{habit.name}
							</span>
							<div className="flex gap-2">
								<button
									onClick={() => toggleHabit(habit.id)}
									className="px-4 py-2 text-sm bg-rose-300 text-neutral-900 rounded-full hover:bg-rose-400 transition"
								>
									{habit.completed ? "Undo" : "Done"}
								</button>
							</div>
						</li>
					))}
				</ul>
			</div>

			<img
				src="/pattern5.png"
				className="block w-[90vw] mx-auto sm:w-full h-[10vh] rounded-md mt-[1rem] object-cover sm:object-fill"
				alt=""
			/>

			{/* Statistics */}
			<div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4 px-4 sm:px-0">
				<div className="bg-neutral-700 p-4 rounded-lg">
					<h4 className="text-neutral-300 font-semibold text-[1.25rem] Absans flex items-center justify-start text-left gap-2">
						Streak{" "}
						<IoIosInformationCircleOutline
							onClick={() => setIsStreakInfo(!isStreakInfo)}
							size={22}
						/>
					</h4>
					<p className={`text-neutral-300 ${isStreakInfo ? "flex" : "hidden"}`}>
						Streak is saved if you've completed over 50% of the habits in a day
					</p>
					<p className="text-[2rem] font-bold Flazie">{user.streak} days</p>
				</div>
				<div className="bg-neutral-700 p-4 rounded-lg">
					<h4 className="text-neutral-300 font-semibold text-[1.25rem] Absans">
						Completion Rate
					</h4>
					<p className="text-[2rem] font-bold Flazie">{user.completionRate}%</p>
				</div>
				<div className="bg-neutral-700 p-4 rounded-lg">
					<h4 className="text-neutral-300 font-semibold text-[1.25rem] Absans">
						Total Habits
					</h4>
					<p className="text-[2rem] font-bold Flazie">{user.totalHabits}</p>
				</div>
				<div className="bg-neutral-700 p-4 rounded-lg">
					<h4 className="text-neutral-300 font-semibold text-[1.25rem] Absans">
						Most Consistent
					</h4>
					<p className="text-[2rem] font-bold Absans">
						{user.mostConsistentHabit}
					</p>
				</div>
			</div>

			{/* Actions */}
			<div className="mt-6 flex justify-between px-4 sm:px-0">
				<button className="px-4 py-2 bg-rose-300 text-neutral-900 rounded-lg hover:bg-rose-400 transition Absans">
					Edit Profile
				</button>
				<button
					onClick={() => habitModal.onOpen()}
					className="px-4 py-2 bg-rose-300 text-neutral-900 rounded-lg hover:bg-rose-400 transition Absans"
				>
					Set New Habit
				</button>
			</div>
		</div>
	);
};

export default ProfilePage;
