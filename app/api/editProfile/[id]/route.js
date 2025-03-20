import { NextResponse } from "next/server";
import prisma from "../../../../libs/prismadb";

export async function PUT(req, { params }) {
	const { id } = await params;
	const { fullName, goalDate } = await req.json();

	try {
		const updatedUser = await prisma.user.update({
			where: { id },
			data: { fullName, goalDate },
		});
		return NextResponse.json(updatedUser);
	} catch (error) {
		return NextResponse.error(error);
	}
}
