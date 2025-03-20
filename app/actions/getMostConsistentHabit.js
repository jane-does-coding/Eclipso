import prisma from "../../libs/prismadb";
import getCurrentUser from "./getCurrentUser";

export default async function getMostConsistentHabit() {
	try {
		const user = await getCurrentUser();

		if (!user?.id) {
			return null;
		}

		const habits = await prisma.habit.findMany({
			where: { userId: user.id },
			include: { completions: true },
		});

		if (!habits.length) {
			return "can't define yet";
		}

		const habitStreaks = habits.map((habit) => {
			const completions = habit.completions
				.filter((c) => c.completed)
				.map((c) => new Date(c.date).toISOString().split("T")[0])
				.sort();

			let longestStreak = 0;
			let currentStreak = 1;

			for (let i = 1; i < completions.length; i++) {
				const prevDate = new Date(completions[i - 1]);
				const currDate = new Date(completions[i]);

				const timeDiff = currDate - prevDate;
				const dayDiff = timeDiff / (1000 * 60 * 60 * 24);

				if (dayDiff === 1) {
					currentStreak++;
				} else if (dayDiff > 1) {
					longestStreak = Math.max(longestStreak, currentStreak);
					currentStreak = 1;
				}
			}

			longestStreak = Math.max(longestStreak, currentStreak);

			return {
				habitId: habit.id,
				habitName: habit.name,
				longestStreak,
			};
		});

		let mostConsistentHabit = habitStreaks.reduce((prev, curr) =>
			curr.longestStreak > prev.longestStreak ? curr : prev
		);

		const isTie =
			habitStreaks.filter(
				(h) => h.longestStreak === mostConsistentHabit.longestStreak
			).length > 1;

		if (mostConsistentHabit.longestStreak === 0) {
			return "can't define yet";
		}

		if (isTie) {
			return "can't define yet";
		}

		return mostConsistentHabit.habitName;
	} catch (error) {
		console.error("Error finding most consistent habit:", error);
		return null;
	}
}
