"use client";

import { FaChevronLeft } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import HabitList from "../../components/HabitList";
import useHabitModal from "../../app/hooks/useHabitModal";

export default function Today({ currentUser }) {
	const router = useRouter();
	const habitModal = useHabitModal();
	const [habits, setHabits] = useState([]);
	const [completionRate, setCompletionRate] = useState(75);
	const calendarData = [80, 50, 100, 30, 60, 90, 20, 40, 70, 50];

	useEffect(() => {
		if (currentUser?.habits) {
			setHabits(currentUser.habits);
		}
	}, [currentUser]);

	const isHabitCompletedToday = (habit) => {
		const today = new Date().toISOString().split("T")[0];
		return habit.completions?.some(
			(completion) =>
				new Date(completion.date).toISOString().split("T")[0] === today &&
				completion.completed
		);
	};

	const toggleHabit = async (id) => {
		const habit = habits.find((h) => h.id === id);
		if (!habit) return;

		const updatedHabit = { ...habit, completed: !isHabitCompletedToday(habit) };

		try {
			const response = await fetch(`/api/habits/completions`, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					habitId: id,
					completed: updatedHabit.completed,
				}),
			});

			if (response.ok) {
				setHabits((prevHabits) =>
					prevHabits.map((h) => (h.id === id ? updatedHabit : h))
				);
			} else {
				console.error("Failed to update habit completion.");
			}
		} catch (error) {
			console.error("Error toggling habit:", error);
		}
	};

	const onDelete = async (habitId) => {
		try {
			const response = await fetch(`/api/habits/index/${habitId}`, {
				method: "DELETE",
			});

			if (response.ok) {
				setHabits((prevHabits) => prevHabits.filter((h) => h.id !== habitId));
			} else {
				console.error("Failed to delete habit.");
			}
		} catch (error) {
			console.error("Error deleting habit:", error);
		}
	};

	return (
		<div className="flex flex-col bg-[#262627] min-h-screen px-4 sm:px-6 md:px-8 pb-[15vh]">
			{/* Header */}
			<div className="flex flex-row items-center w-full mx-auto md:w-[93vw] mt-[2rem]">
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
				<HabitList
					habits={habits}
					toggleHabit={toggleHabit}
					onDelete={onDelete}
					habitModal={habitModal}
				/>
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
