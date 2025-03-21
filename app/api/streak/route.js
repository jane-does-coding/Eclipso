import prisma from "../../../libs/prismadb";
import { NextResponse } from "next/server";
import getCurrentUser from "../../actions/getCurrentUser";

export async function GET() {
	try {
		let user = await getCurrentUser();

		if (!user?.id) {
			return NextResponse.json({ message: "not authorized" }, { status: 401 });
		}

		const totalHabits = await prisma.habit.count({
			where: { userId: user.id },
		});

		if (totalHabits === 0) {
			return NextResponse.json({ streak: 0 });
		}

		const completions = await prisma.habitCompletion.findMany({
			where: { userId: user.id, completed: true },
			select: { date: true },
			orderBy: { date: "asc" },
		});

		if (!completions.length) {
			return NextResponse.json({ streak: 0 });
		}

		const completionsByDate = completions.reduce((acc, completion) => {
			const date = new Date(completion.date).toISOString().split("T")[0];
			if (!acc[date]) {
				acc[date] = 0;
			}
			acc[date]++;
			return acc;
		}, {});

		const completedDates = Object.keys(completionsByDate).filter(
			(date) => completionsByDate[date] === totalHabits
		);

		if (!completedDates.length) {
			return NextResponse.json({ streak: 0 });
		}

		completedDates.sort();

		let streak = 0;
		let currentStreak = 1;

		for (let i = 1; i < completedDates.length; i++) {
			const prevDate = new Date(completedDates[i - 1]);
			const currDate = new Date(completedDates[i]);

			const timeDiff = currDate - prevDate;
			const dayDiff = timeDiff / (1000 * 60 * 60 * 24);

			if (dayDiff === 1) {
				currentStreak++;
			} else if (dayDiff > 1) {
				streak = Math.max(streak, currentStreak);
				currentStreak = 1;
			}
		}

		streak = Math.max(streak, currentStreak);

		return NextResponse.json({ streak });
	} catch (error) {
		console.error("Error calculating streak:", error);
		return NextResponse.json(
			{ message: "Internal server error" },
			{ status: 500 }
		);
	}
}
