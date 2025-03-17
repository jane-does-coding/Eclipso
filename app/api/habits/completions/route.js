import prisma from "../../../../libs/prismadb";
import { NextResponse } from "next/server";
import getCurrentUser from "../../../actions/getCurrentUser";

export async function POST(req) {
	const body = await req.json();
	const { habitId } = body;
	const user = await getCurrentUser();
	console.log(habitId, user, body, "date:" + new Date());

	try {
		const todo = await prisma.todo.create({
			data: {
				title,
				userId: user?.id,
			},
		});

		console.log(todo);
		return NextResponse.json(todo);
	} catch (error) {
		console.error("Error creating todo:", error);
		return NextResponse.json(
			{ message: "Error creating todo" },
			{ status: 500 }
		);
	}
	if (true) {
	} else {
		return NextResponse.json({ message: "not authorized" }, { status: 401 });
	}
}
