import prisma from "@/libs/prisma";

export async function POST(req) {
	const { habitId, date, completed } = await req.json();

	try {
		const completion = await prisma.habitCompletion.create({
			data: {
				habitId,
				date: new Date(date),
				completed,
			},
		});

		return new Response(JSON.stringify(completion), { status: 201 });
	} catch (error) {
		console.error(error);
		return new Response(
			JSON.stringify({ message: "Failed to mark habit completion" }),
			{ status: 500 }
		);
	}
}
