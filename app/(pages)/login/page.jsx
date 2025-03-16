"use client";
import React, { useEffect, useState } from "react";
import useLoginModal from "../../../app/hooks/useLoginModal";

const Page = () => {
	const loginModal = useLoginModal();
	const [modalOpened, setModalOpened] = useState(false);

	useEffect(() => {
		if (!modalOpened) {
			loginModal.onOpen();
			setModalOpened(true);
		}
	}, [loginModal, modalOpened]);

	return (
		<div className="min-h-screen bg-neutral-800">
			<button onClick={() => loginModal.onOpen()}>Login</button>
		</div>
	);
};

export default Page;
