import { getServerSession } from "next-auth/next";

import prisma from "../../libs/prismadb";
import { authOptions } from "../../pages/api/auth/[...nextauth]";

export async function getSession() {
	return await getServerSession(authOptions);
}

export default async function getCurrentUser() {
	try {
		const session = await getSession();

		if (!session?.user?.email) {
			return null;
		}

		const currentUser = await prisma.user.findUnique({
			where: {
				email: session.user.email as string,
			},
			include: {
				habits: {
					include: {
						completions: true,
					},
				},
			},
		});

		if (!currentUser) {
			return null;
		}

		return {
			...currentUser,
			createdAt: currentUser.createdAt.toISOString(),
			updatedAt: currentUser.updatedAt.toISOString(),
		};
	} catch (error: any) {
		console.log("error" + error);
		return null;
	}
}
