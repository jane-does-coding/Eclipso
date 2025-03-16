"use client";
import React from "react";
import useLoginModal from "../app/hooks/useLoginModal";

const LoginButton = () => {
	const loginModal = useLoginModal();
	return (
		<button
			onClick={() => loginModal.onOpen()}
			className="bg-gradient-to-r from-rose-300 to-rose-400 px-14 py-2 rounded-full text-[1.5rem] Absans font-bold"
		>
			Login
		</button>
	);
};

export default LoginButton;
