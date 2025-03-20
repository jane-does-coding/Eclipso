import { FaRegTrashCan } from "react-icons/fa6";

const HabitList = ({ habits, toggleHabit, onDelete, habitModal }) => {
	const isHabitCompletedToday = (habit) => {
		const today = new Date().toISOString().split("T")[0];

		return habit.completions.some(
			(completion) =>
				new Date(completion.date).toISOString().split("T")[0] === today &&
				completion.completed
		);
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
		</div>
	);
};

export default HabitList;
