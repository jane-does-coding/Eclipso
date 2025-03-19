import prisma from "../../../../libs/prismadb";
import { NextResponse } from "next/server";
import getCurrentUser from "../../../actions/getCurrentUser";

export async function POST(req) {
	const body = await req.json();
	const { habitId, completed } = body;
	const currentUser = await getCurrentUser();

	if (!currentUser) {
		return NextResponse.json({ error: "No currentUser" }, { status: 401 });
	}

	const currentDate = new Date();
	currentDate.setUTCHours(0, 0, 0, 0);
	console.log({
		habitId,
		userId: currentUser.id,
		date: currentDate,
	});

	try {
		const existingCompletion = await prisma.habitCompletion.findFirst({
			where: {
				habitId,
				userId: currentUser.id,
				date: currentDate,
			},
		});

		if (existingCompletion) {
			const updatedEntry = await prisma.habitCompletion.update({
				where: { id: existingCompletion.id },
				data: { completed },
			});
			return NextResponse.json(updatedEntry);
		} else {
			const newEntry = await prisma.habitCompletion.create({
				data: {
					habitId,
					userId: currentUser.id,
					completed,
					date: currentDate,
				},
			});
			return NextResponse.json(newEntry);
		}
	} catch (error) {
		console.error("Error updating habit completion:", error);
		return NextResponse.json(
			{ error: "Error updating habit completion" },
			{ status: 500 }
		);
	}
}
