import { NextResponse } from "next/server";
import prisma from "../../../../../libs/prismadb";
import getCurrentUser from "../../../../../app/actions/getCurrentUser";

export async function DELETE(request, { params }) {
	const currentUser = await getCurrentUser();

	if (!currentUser) return NextResponse.error();

	const { habitId } = await params;

	if (!habitId || typeof habitId !== "string") throw new Error("Invalid Id");

	const todo = await prisma.habit.delete({
		where: {
			id: habitId,
		},
	});

	return NextResponse.json(todo);
}
