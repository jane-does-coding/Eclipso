import prisma from "../../../../libs/prisma";
import bcrypt from "bcrypt";

export async function POST(req) {
	const { fullName, email, password, goalDate, habits } = await req.json();

	try {
		const hashedPassword = await bcrypt.hash(password, 10);

		// Create user first
		const user = await prisma.user.create({
			data: {
				fullName,
				email,
				password: hashedPassword,
				goalDate: Number(goalDate),
			},
		});

		// Insert habits associated with the user
		if (habits && habits.length > 0) {
			await prisma.habit.createMany({
				data: habits.map((habit) => ({
					name: habit,
					userId: user.id,
				})),
			});
		}

		return new Response(JSON.stringify(user), { status: 201 });
	} catch (error) {
		console.error(error);
		return new Response(
			JSON.stringify({ message: "Failed to register user" }),
			{ status: 500 }
		);
	}
}
