import React from "react";
import Today from "../../../components/Pages/Today";
import getCurrentUser from "../../actions/getCurrentUser";

const page = async () => {
	const currentUser = await getCurrentUser();
	return (
		<div>
			<Today currentUser={currentUser} />
		</div>
	);
};

export default page;
