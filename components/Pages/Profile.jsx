"use client";
import { useEffect, useState } from "react";
import { FaChevronLeft } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { IoIosInformationCircleOutline } from "react-icons/io";
import useHabitModal from "../../app/hooks/useHabitModal";
import useEditProfileModal from "../../app/hooks/useEditProfileModal";
import axios from "axios";
import { FaRegTrashCan } from "react-icons/fa6";
import HabitList from "../HabitList";
import CircularProgress from "../CircularProgress";

const ProfilePage = ({
	currentUser,
	mostConsistentHabit: mostConsistentHabitProp,
}) => {
	const router = useRouter();
	const [habits, setHabits] = useState(currentUser.habits || []);
	const [isStreakInfo, setIsStreakInfo] = useState(false);
	const habitModal = useHabitModal();
	const editProfileModal = useEditProfileModal();
	const [mostConsistentHabit, setMostConsistentHabit] = useState(
		mostConsistentHabitProp
	);
	const [streak, setStreak] = useState(0);

	useEffect(() => {
		if (currentUser?.id) {
			axios
				.get(`/api/streak/`)
				.then((res) => setStreak(res.data.streak))
				.catch((err) => console.error("Error fetching streak:", err));
		}
	}, [currentUser]);

	const isHabitCompletedToday = (habit) => {
		const today = new Date().toISOString().split("T")[0];

		return habit.completions.some(
			(completion) =>
				new Date(completion.date).toISOString().split("T")[0] === today &&
				completion.completed
		);
	};

	const toggleHabit = async (id) => {
		// Find the habit to toggle
		const habit = habits.find((h) => h.id === id);
		if (!habit) return;

		// Create an updated habit object
		const updatedHabit = { ...habit, completed: !isHabitCompletedToday(habit) };

		// Optimistically update the UI
		setHabits((prevHabits) =>
			prevHabits.map((h) => (h.id === id ? updatedHabit : h))
		);

		try {
			// Send the request to the backend
			const response = await fetch(`/api/habits/completions`, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					habitId: id,
					completed: updatedHabit.completed,
				}),
			});

			if (!response.ok) {
				throw new Error("Failed to update habit completion.");
			}
		} catch (error) {
			// Revert the UI if the request fails
			setHabits((prevHabits) =>
				prevHabits.map((h) => (h.id === id ? habit : h))
			);
			console.error("Error toggling habit:", error);
			toast.error("Failed to update habit. Please try again.");
		}
	};
	const onDelete = async (habitId) => {
		try {
			await axios.delete(`/api/habits/index/${habitId}`);
			router.push("/");
		} catch (error) {
			console.error("Error deleting habit:", error);
		} finally {
			router.push("/");
		}
		router.push("/");
	};

	const user = {
		name: currentUser.fullName,
		email: currentUser.email,
		goalDays: currentUser.goalDate,
		goalProgress: streak,
		streak: streak,
		completionRate: Math.round((streak / currentUser.goalDate) * 100),
		totalHabits: currentUser.habits.length,
		mostConsistentHabit: mostConsistentHabit,
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

			<h1 className="text-[3rem] sm:text-[4rem] md:text-[6rem] Flazie text-green-400 glowing-text text-center">
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
			{/* <div className="mt-6 px-4 sm:px-0">
				<h3 className="text-lg font-semibold Absans">Daily Habits</h3>
				<ul className="mt-2 space-y-3">
					{habits.length == 0 && (
						<div className="flex items-center justify-center flex-col mb-[5vh] gap-6">
							<h1 className="text-[2rem] Absans text-center mx-auto">
								No habits yet, add some habits.
							</h1>
							<button
								onClick={() => habitModal.onOpen()}
								className="px-4 py-2 bg-green-400 text-neutral-900 rounded-lg hover:bg-green-500 transition Absans"
							>
								Set New Habit
							</button>
						</div>
					)}
					{habits.length > 0 &&
						habits.map((habit) => {
							const isCompleted = isHabitCompletedToday(habit);

							return (
								<li
									key={habit.id}
									className={`flex items-center justify-between bg-neutral-700 p-3 px-8 rounded-lg ${
										isCompleted ? "bg-green-700" : ""
									}`}
								>
									<span
										className={`Absans text-[1.5rem] ${
											isCompleted ? "line-through text-gray-500" : ""
										}`}
									>
										{habit.name}
									</span>
									<div className="flex gap-2">
										<button
											onClick={() => toggleHabit(habit.id)}
											className={`px-4 py-2 text-sm rounded-full transition ${
												isCompleted
													? "bg-gray-500 text-white hover:bg-gray-600"
													: "bg-green-400 text-neutral-900 hover:bg-green-500"
											}`}
										>
											{isCompleted ? "Undo" : "Done"}
										</button>
										<button onClick={() => onDelete(habit.id)}>
											<FaRegTrashCan size={24} />
										</button>
									</div>
								</li>
							);
						})}
				</ul>
			</div> */}
			<HabitList
				habits={habits}
				toggleHabit={toggleHabit}
				onDelete={onDelete}
				habitModal={habitModal}
			/>

			<img
				src="/pattern7.png"
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
						Streak is saved if you've completed 100% of the habits in a day
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
				<button
					onClick={() => editProfileModal.onOpen()}
					className="px-4 py-2 bg-green-400 text-neutral-900 rounded-lg hover:bg-green-500 transition Absans"
				>
					Edit Profile
				</button>
				<button
					onClick={() => habitModal.onOpen()}
					className="px-4 py-2 bg-green-400 text-neutral-900 rounded-lg hover:bg-green-500 transition Absans"
				>
					Set New Habit
				</button>
			</div>
		</div>
	);
};

export default ProfilePage;
