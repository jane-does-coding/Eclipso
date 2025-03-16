"use client";
import { useCallback, useState } from "react";
import { AiFillGithub } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { useForm } from "react-hook-form";
import useRegisterModal from "@/app/hooks/useRegisterModal";
import Modal from "./Modal";
import Heading from "../Heading";
import Input from "../Input";
import toast from "react-hot-toast";
import Button from "../Button";
import useHabitModal from "../../app/hooks/useHabitModal";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import axios from "axios";

const HabitModal = () => {
	const router = useRouter();
	const registerModal = useRegisterModal();
	const habitModal = useHabitModal();
	const [isLoading, setIsLoading] = useState(false);

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		defaultValues: {
			name: "",
		},
	});

	const onSubmit = async (data) => {
		console.log("Form Data:", data);
		console.log("Form Errors:", errors);

		if (!data.name) {
			toast.error("All fields are required");
			return;
		}

		try {
			const response = await axios.post("/api/habits/index", {
				name: data.name,
			});
			const responsedata = response.data;

			console.log(response, responsedata);

			console.log(responsedata);

			console.log("habit created with ID:", responsedata.id);

			toast.success("habit Created");
		} catch (error) {
			console.error("Error creating habit:", error);
			toast.error("Error creating habit");
		}
	};

	const onToggle = useCallback(() => {
		habitModal.onClose();
		registerModal.onOpen();
	}, [habitModal, registerModal]);

	const bodyContent = (
		<div className="flex flex-col gap-4">
			<Heading title="Welcome back" subtitle="Login to your account!" />
			<Input
				id="name"
				label="name"
				disabled={isLoading}
				errors={errors}
				register={register}
				required
			/>
		</div>
	);

	const footerContent = (
		<div className="flex flex-col gap-4 mt-3">
			<hr />

			<div className="text-neutral-400 text-center mt-2 font-light">
				<div className="flex flex-row items-center gap-2 justify-center">
					<p>First time using Eclipso?</p>
					<p
						onClick={onToggle}
						className="text-neutral-200 cursor-pointer hover:underline"
					>
						Create an account
					</p>
				</div>
			</div>
		</div>
	);

	return (
		<Modal
			disabled={isLoading}
			isOpen={habitModal.isOpen}
			title="Habits"
			actionLabel="Continue"
			onClose={habitModal.onClose}
			onSubmit={handleSubmit(onSubmit)}
			body={bodyContent}
			footer={footerContent}
		/>
	);
};

export default HabitModal;
