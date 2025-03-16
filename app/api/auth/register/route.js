import prisma from "../../../../libs/prisma";
import bcrypt from "bcrypt";

export async function POST(req) {
	const { fullName, email, password, goalDate } = await req.json();

	try {
		const hashedPassword = await bcrypt.hash(password, 10);

		const user = await prisma.user.create({
			data: {
				fullName,
				email,
				password: hashedPassword,
				goalDate: Number(goalDate),
			},
		});

		return new Response(JSON.stringify(user), { status: 201 });
	} catch (error) {
		console.error(error);
		return new Response(
			JSON.stringify({ message: "Failed to register user" }),
			{ status: 500 }
		);
	}
}
