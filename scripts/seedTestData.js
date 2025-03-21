const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function seedTestData() {
	try {
		const user = await prisma.user.findUnique({
			where: { email: "yevheniiasimaka@gmail.com" },
		});

		if (!user) {
			throw new Error("User not found");
		}

		const habits = await prisma.habit.findMany({
			where: { userId: user.id },
		});

		if (habits.length === 0) {
			throw new Error("No habits found for the user");
		}

		// Add new habits: Reading, Yoga, and Journaling
		const newHabitNames = ["Reading", "Yoga", "Journaling"];
		const existingHabitNames = habits.map((habit) => habit.name);
		const habitsToCreate = newHabitNames.filter(
			(name) => !existingHabitNames.includes(name)
		);

		for (const name of habitsToCreate) {
			await prisma.habit.create({
				data: { userId: user.id, name },
			});
		}

		// Fetch updated habits list after adding new ones
		const updatedHabits = await prisma.habit.findMany({
			where: { userId: user.id },
		});

		let habitCompletions = [];
		let currentDate = new Date();
		currentDate.setDate(currentDate.getDate() - 30);
		let streak = 0;

		for (let i = 0; i < 30; i++) {
			if (streak < 4 + Math.floor(Math.random() * 4)) {
				updatedHabits.forEach((habit) => {
					habitCompletions.push({
						habitId: habit.id,
						userId: user.id,
						date: new Date(currentDate),
						completed: true,
					});
				});
				streak++;
			} else {
				streak = 0;
			}
			currentDate.setDate(currentDate.getDate() + 1);
		}

		// Ensure last 5 days are a streak
		currentDate = new Date();
		for (let i = 5; i > 0; i--) {
			let date = new Date();
			date.setDate(currentDate.getDate() - i);
			updatedHabits.forEach((habit) => {
				habitCompletions.push({
					habitId: habit.id,
					userId: user.id,
					date: date,
					completed: true,
				});
			});
		}

		await prisma.habitCompletion.createMany({ data: habitCompletions });
		console.log("User habit data seeded successfully!");
	} catch (error) {
		console.error("Error seeding test data:", error);
	} finally {
		await prisma.$disconnect();
	}
}

seedTestData();
