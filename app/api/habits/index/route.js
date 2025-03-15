import prisma from "@/libs/prisma";

export async function POST(req) {
	const { userId, name } = await req.json();

	try {
		const habit = await prisma.habit.create({
			data: {
				name,
				userId,
			},
		});

		return new Response(JSON.stringify(habit), { status: 201 });
	} catch (error) {
		console.error(error);
		return new Response(JSON.stringify({ message: "Failed to add habit" }), {
			status: 500,
		});
	}
}
