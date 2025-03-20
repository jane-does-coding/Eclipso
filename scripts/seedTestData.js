const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function seedTestData() {
	try {
		const habit1 = await prisma.habit.create({
			data: {
				name: "Practice typing speed",
				userId: "67d61923496a75471396b0a3",
			},
		});

		const habit2 = await prisma.habit.create({
			data: {
				name: "Solve Leetcode",
				userId: "67d61923496a75471396b0a3",
			},
		});

		await prisma.habitCompletion.createMany({
			data: [
				{
					habitId: habit1.id,
					userId: "67d61923496a75471396b0a3",
					date: new Date("2023-10-01"),
					completed: true,
				},
				{
					habitId: habit1.id,
					userId: "67d61923496a75471396b0a3",
					date: new Date("2023-10-02"),
					completed: true,
				},
				{
					habitId: habit1.id,
					userId: "67d61923496a75471396b0a3",
					date: new Date("2023-10-03"),
					completed: true,
				},
				{
					habitId: habit2.id,
					userId: "67d61923496a75471396b0a3",
					date: new Date("2023-10-01"),
					completed: true,
				},
				{
					habitId: habit2.id,
					userId: "67d61923496a75471396b0a3",
					date: new Date("2023-10-02"),
					completed: true,
				},
			],
		});

		console.log("Test data seeded successfully!");
	} catch (error) {
		console.error("Error seeding test data:", error);
	} finally {
		await prisma.$disconnect();
	}
}

seedTestData();
