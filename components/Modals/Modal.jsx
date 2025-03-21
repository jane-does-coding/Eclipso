"use client";
import { useCallback, useEffect, useState } from "react";
import { IoMdClose } from "react-icons/io";
import Button from "../Button";

const Modal = ({
	isOpen,
	onClose,
	onSubmit,
	title,
	body,
	footer,
	actionLabel,
	disabled,
	secondaryAction,
	secondaryActionLabel,
}) => {
	const [showModal, setShowModal] = useState(isOpen);

	const handleClose = useCallback(() => {
		if (disabled) return;

		setShowModal(false);
		setTimeout(() => {
			onClose();
		}, 300);
	}, [disabled, onClose]);

	const handleSubmit = useCallback(() => {
		if (disabled) return;

		onSubmit();
	}, [disabled, onSubmit]);

	const handleSecondaryAction = useCallback(() => {
		if (disabled || !secondaryAction) return;

		secondaryAction();
	}, [disabled, secondaryAction]);

	useEffect(() => {
		setShowModal(isOpen);
	}, [isOpen]);

	if (!isOpen) {
		return null;
	}

	return (
		<>
			<div className="justify-center items-center flex overlow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none bg-neutral-700/70">
				<div className="pt-10  relative w-full md:w-4/6 lg:w-3/6 xl:w-2/5 my-6 mx-auto h-full lg:h-auto md:h-auto">
					{/* Content */}
					<div
						className={`translate duration-300 h-full ${
							showModal ? "translate-y-0" : "translate-y-full"
						} ${showModal ? "opacity-100" : "opacity-0"}`}
					>
						<div className="translate h-full lg:h-auto md:h-auto rounded-lg relative flex flex-col w-full shadow-2xl bg-neutral-800 border-neutral-900 border-2 outline-none focus:outline-none">
							{/* Header */}
							<div className="flex items-center p-6 rounded-t justify-center relative border-b-[1px]">
								<button
									onClick={handleClose}
									className="p-1 border-0 hover:opacity-70 transition absolute left-9 text-neutral-100"
								>
									<IoMdClose size={18} />
								</button>
								<div className="text-[2rem] Flazie font-semibold text-neutral-100">
									{title}
								</div>
							</div>
							{/* Body */}
							<div className="relative p-6 pt-4 pb-0 flex-auto">{body}</div>
							{/* Footer */}
							<div className="flex flex-col gap-2 p-6">
								<div className="flex flex-row items-center gap-4 w-full">
									{secondaryAction && secondaryActionLabel && (
										<Button
											disabled={disabled}
											label={secondaryActionLabel}
											onClick={handleSecondaryAction}
											outline
										/>
									)}
									<Button
										disabled={disabled}
										label={actionLabel}
										onClick={handleSubmit}
									/>
								</div>
								{footer}
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default Modal;
