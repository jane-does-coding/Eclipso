"use client";
import { FaChevronLeft } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import HabitList from "../HabitList";
import useHabitModal from "../../app/hooks/useHabitModal";
import Calendar from "../Calendar";

export default function Today({ currentUser }) {
	const router = useRouter();
	const habitModal = useHabitModal();
	const [habits, setHabits] = useState(currentUser?.habits || []);
	const [completionRate, setCompletionRate] = useState(0);

	// Calculate completion rate whenever habits change
	useEffect(() => {
		calculateCompletionRate();
	}, [habits]);

	const isHabitCompletedToday = (habit) => {
		const today = new Date().toISOString().split("T")[0];
		return habit.completions?.some(
			(completion) =>
				new Date(completion.date).toISOString().split("T")[0] === today &&
				completion.completed
		);
	};

	const calculateCompletionRate = () => {
		const totalHabits = habits.length;
		if (totalHabits === 0) {
			setCompletionRate(0);
			return;
		}

		const completedHabits = habits.filter((habit) =>
			isHabitCompletedToday(habit)
		).length;
		const rate = Math.round((completedHabits / totalHabits) * 100);
		setCompletionRate(rate);
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
				const updatedHabits = habits.map((h) =>
					h.id === id ? updatedHabit : h
				);
				setHabits(updatedHabits);
			} else {
				console.error("Failed to update habit completion.");
			}
		} catch (error) {
			console.error("Error toggling habit:", error);
		}
	};

	// Transform habits into the format expected by the Calendar component
	const getHabitDataForCalendar = () => {
		const habitData = {};

		habits.forEach((habit) => {
			habit.completions?.forEach((completion) => {
				const date = new Date(completion.date).toISOString().split("T")[0];
				if (!habitData[date]) {
					habitData[date] = { completed: 0, total: 0 };
				}
				habitData[date].total++;
				if (completion.completed) {
					habitData[date].completed++;
				}
			});
		});

		// Calculate completion percentage for each day
		const result = {};
		Object.keys(habitData).forEach((date) => {
			result[date] = Math.round(
				(habitData[date].completed / habitData[date].total) * 100
			);
		});

		return result;
	};

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
							stroke="oklch(0.792 0.209 151.711)"
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

				{/* Habit List */}
				<div className="text-white w-[45vw]">
					<HabitList
						habits={habits}
						toggleHabit={toggleHabit}
						habitModal={habitModal}
					/>
				</div>
			</div>

			{/* Calendar Progress */}
			<div className="flex justify-center mt-12">
				<Calendar habitData={getHabitDataForCalendar()} />
			</div>
		</div>
	);
}
