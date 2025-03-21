"use client";

import { useState } from "react";
import { AiFillGithub } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { useForm } from "react-hook-form";
import useRegisterModal from "../../app/hooks/useRegisterModal";
import Modal from "./Modal";
import Heading from "../Heading";
import Input from "../Input";
import toast from "react-hot-toast";
import Button from "../Button";
import { signIn } from "next-auth/react";
import useLoginModal from "../../app/hooks/useLoginModal";

const RegisterModal = () => {
	const registerModal = useRegisterModal();
	const loginModal = useLoginModal();
	const [isLoading, setIsLoading] = useState(false);
	const [currentStep, setCurrentStep] = useState(1);

	const {
		register,
		handleSubmit,
		formState: { errors },
		setValue,
	} = useForm({
		defaultValues: {
			name: "",
			email: "",
			password: "",
			habits: ["", "", ""],
			goalDuration: 7,
		},
	});

	const onSubmit = async (data) => {
		setIsLoading(true);

		try {
			if (currentStep === 1) {
				setCurrentStep(2);
			} else if (currentStep === 2) {
				setCurrentStep(3);
			} else if (currentStep === 3) {
				console.log("Setting goal and registering:", data);

				const response = await fetch("/api/auth/register", {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({
						fullName: data.name,
						email: data.email,
						password: data.password,
						goalDate: data.goalDuration,
						habits: data.habits.filter((habit) => habit.trim() !== ""),
					}),
				});

				if (!response.ok) {
					throw new Error("Failed to register user");
				}

				toast.success("Registration successful!");
				registerModal.onClose();
			}
		} catch (error) {
			console.error(error);
			toast.error("Something went wrong.");
		} finally {
			setIsLoading(false);
		}
	};

	const bodyContent = (
		<div className="flex flex-col gap-4">
			{currentStep === 1 && (
				<>
					<Heading title="Welcome to Eclipso" subtitle="Create an account!" />
					<div className="flex flex-row gap-4">
						<Input
							id="email"
							label="Email"
							disabled={isLoading}
							register={register}
							errors={errors}
							required
						/>
						<Input
							id="name"
							label="Full Name"
							disabled={isLoading}
							register={register}
							errors={errors}
							required
						/>
					</div>
					<Input
						id="password"
						label="Password"
						type="password"
						disabled={isLoading}
						register={register}
						errors={errors}
						required
					/>
				</>
			)}

			{currentStep === 2 && (
				<>
					<Heading title="Starting Habits" subtitle="Add 3 habits" />
					{[0, 1, 2].map((index) => (
						<Input
							key={index}
							id={`habits[${index}]`}
							label={`Habit #${index + 1}`}
							disabled={isLoading}
							register={register}
							errors={errors}
							required
						/>
					))}
				</>
			)}

			{currentStep === 3 && (
				<>
					<Heading
						title="Set Your First Goal"
						subtitle="Choose a goal duration"
					/>
					<div className="flex flex-col gap-4">
						<Button
							onClick={() => setValue("goalDuration", 7)}
							disabled={isLoading}
							label="7 Days"
						/>
						<Button
							onClick={() => setValue("goalDuration", 14)}
							disabled={isLoading}
							label="14 Days"
						/>
						<Button
							onClick={() => setValue("goalDuration", 21)}
							disabled={isLoading}
							label="21 Days"
						/>
						<Input
							id="goalDurationCustom"
							label="Custom Goal (Max 21 days)"
							type="number"
							disabled={isLoading}
							register={register}
							errors={errors}
							min={1}
							max={21}
						/>
					</div>
				</>
			)}
		</div>
	);

	const footerContent = (
		<div className="flex flex-col gap-4 mt-3">
			<hr />
			<div className="flex justify-between gap-3">
				<Button
					onClick={() => setCurrentStep((prev) => Math.max(prev - 1, 1))}
					disabled={isLoading}
					label="Back"
				/>
				<Button
					onClick={handleSubmit(onSubmit)}
					disabled={isLoading}
					label={currentStep === 3 ? "Finish" : "Next"}
				/>
			</div>
		</div>
	);

	return (
		<Modal
			disabled={isLoading}
			isOpen={registerModal.isOpen}
			title="Register"
			actionLabel="Continue"
			onClose={registerModal.onClose}
			onSubmit={handleSubmit(onSubmit)}
			body={bodyContent}
			footer={footerContent}
		/>
	);
};

export default RegisterModal;
