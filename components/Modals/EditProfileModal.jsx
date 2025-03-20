"use client";

import { useState } from "react";
import Modal from "./Modal";
import Input from "../Input";
import Button from "../Button";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import axios from "axios";
import useEditProfileModal from "../../app/hooks/useEditProfileModal";

const EditProfileModal = ({ currentUser }) => {
	const router = useRouter();
	const [fullName, setFullName] = useState(currentUser.fullName || "");
	const [goalDate, setGoalDate] = useState(currentUser.goalDate || 7);
	const [isLoading, setIsLoading] = useState(false);
	const editProfileModal = useEditProfileModal();

	const onSubmit = async () => {
		setIsLoading(true);
		try {
			await axios.put(`/api/editProfile/${currentUser.id}`, {
				fullName,
				goalDate,
			});
			toast.success("Profile updated successfully!");
			onClose();
			router.refresh();
		} catch (error) {
			toast.error("Failed to update profile");
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<Modal
			isOpen={editProfileModal.isOpen}
			onClose={editProfileModal.onClose}
			title="Edit Profile"
			body={
				<div className="flex flex-col gap-4">
					<input
						type="text"
						value={fullName}
						onChange={(e) => setFullName(e.target.value)}
						disabled={isLoading}
						className="p-4 rounded-md bg-neutral-700 text-white Absans focus:outline-none focus:ring-4 focus:ring-green-400"
					/>
					<input
						type="number"
						value={goalDate}
						onChange={(e) => setGoalDate(Number(e.target.value))}
						disabled={isLoading}
						className="p-4 rounded-md bg-neutral-700 text-white Absans focus:outline-none focus:ring-2 focus:ring-green-400"
					/>
					{/* <Button
						label={"Save Changes"}
						onClick={onSubmit}
						disabled={isLoading}
					/> */}
				</div>
			}
			actionLabel={"Save Changes"}
			onSubmit={onSubmit}
		/>
	);
};

export default EditProfileModal;
