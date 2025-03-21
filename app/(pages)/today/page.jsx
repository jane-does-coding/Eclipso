import React from "react";
import Today from "../../../components/Pages/Today";
import getCurrentUser from "../../actions/getCurrentUser";
import LoginButton from "../../../components/LoginButton";

const page = async () => {
	const currentUser = await getCurrentUser();

	if (!currentUser)
		return (
			<div className="min-h-[95vh] bg-neutral-800">
				<div className="w-[100vw] h-[70vh] flex flex-col items-center justify-center">
					<h1 className="Flazie glowing-text text-[6rem] text-green-400">
						Eclipso
					</h1>
					<h2 className="text-neutral-200 Absans text-[1.75rem] mb-[5vh]">
						You must be logged in to access this page
					</h2>
					<LoginButton />
				</div>
			</div>
		);
	return (
		<div>
			<Today currentUser={currentUser} />
		</div>
	);
};

export default page;
