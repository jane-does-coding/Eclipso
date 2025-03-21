import { useState } from "react";
import { FaRegTrashCan } from "react-icons/fa6";

const HabitList = ({ habits, toggleHabit, onDelete, habitModal }) => {
	const [fakeCompletionStates, setFakeCompletionStates] = useState({});

	const isHabitCompletedToday = (habit) => {
		const today = new Date().toISOString().split("T")[0];
		return habit.completions.some(
			(completion) =>
				new Date(completion.date).toISOString().split("T")[0] === today &&
				completion.completed
		);
	};

	const handleToggleHabit = (habitId) => {
		// Toggle the fake completion state immediately
		setFakeCompletionStates((prevStates) => ({
			...prevStates,
			[habitId]: !prevStates[habitId],
		}));

		// Call the original toggleHabit function to update the backend
		toggleHabit(habitId);
	};

	return (
		<div className="mt-6 px-4 sm:px-0">
			<h3 className="text-lg font-semibold Absans">Daily Habits</h3>
			<ul className="mt-2 space-y-3">
				{habits.length === 0 && (
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
				{habits.map((habit) => {
					const isCompleted = isHabitCompletedToday(habit);
					const isFakeCompleted =
						fakeCompletionStates[habit.id] !== undefined
							? fakeCompletionStates[habit.id]
							: isCompleted;

					return (
						<li
							key={habit.id}
							initial={{ opacity: 0, y: -10 }}
							animate={{ opacity: 1, y: 0 }}
							exit={{ opacity: 0, y: -10 }}
							className={`flex items-center justify-between bg-neutral-700 p-3 px-8 rounded-lg ${
								isFakeCompleted ? "bg-green-700" : ""
							}`}
						>
							<span
								className={`Absans text-[1.5rem] ${
									isFakeCompleted ? "line-through text-gray-500" : ""
								}`}
							>
								{habit.name}
							</span>
							<div className="flex gap-2">
								<button
									onClick={() => handleToggleHabit(habit.id)}
									className={`px-4 py-2 text-sm rounded-full transition ${
										isFakeCompleted
											? "bg-gray-500 text-white hover:bg-gray-600"
											: "bg-green-400 text-neutral-900 hover:bg-green-500"
									}`}
								>
									{isFakeCompleted ? "Undo" : "Done"}
								</button>
								<button onClick={() => onDelete(habit.id)}>
									<FaRegTrashCan size={24} />
								</button>
							</div>
						</li>
					);
				})}
			</ul>
		</div>
	);
};

export default HabitList;
