import { getServerSession } from "next-auth/next";

/* import { authOptions } from "@/pages/api/auth/[...nextauth]";
 */
import prisma from "../../libs/prismadb";
import { authOptions } from "../../pages/api/auth/[...nextauth]";

export async function getSession() {
	return await getServerSession(authOptions);
}

export default async function getCurrentUser() {
	try {
		const session = await getSession();

		if (!session?.user?.email) {
			console.log("heh");
			return "didnt pass first";
		}

		const currentUser = await prisma.user.findUnique({
			where: {
				email: session.user.email as string,
			},
		});

		if (!currentUser) {
			console.log("not logged in");
			return "didnt pass 2nd";
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
