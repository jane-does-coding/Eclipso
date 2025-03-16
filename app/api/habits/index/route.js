// server/api/habits.ts

import prisma from "../../../../libs/prismadb";
import { NextResponse } from "next/server";
import getCurrentUser from "../../../actions/getCurrentUser";

export async function POST(req) {
	const body = await req.json();
	const { name } = body;
	const user = await getCurrentUser();
	console.log(name, user, body);

	if (user?.id) {
		try {
			const habit = await prisma.habit.create({
				data: {
					name,
					userId: user?.id,
				},
			});

			console.log(habit);
			return NextResponse.json(habit);
		} catch (error) {
			console.error("Error creating habit:", error);
			return NextResponse.json(
				{ message: "Error creating habit" },
				{ status: 500 }
			);
		}
	} else {
		return NextResponse.json({ message: "not authorized" }, { status: 401 });
	}
}
