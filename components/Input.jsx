"use client";

import { BiDollar } from "react-icons/bi";

const Input = ({
	id,
	label,
	type = "text",
	disabled,
	formatPrice,
	required,
	register,
	errors,
}) => {
	return (
		<div className="w-full relative">
			{formatPrice && (
				<BiDollar
					size={24}
					className={"text-neutral-700 absolute top-5 left-2"}
				/>
			)}
			<input
				id={id}
				disabled={disabled}
				{...register(id, { required })}
				placeholder=" "
				type={type}
				className={`peer w-full p-4 pt-6 font-light bg-neutral-900/80 border-2 text-neutral-200 rounded-md outline-none transition disabled:opacity-70 disabled:cursor-not-allowed Absans ${
					formatPrice ? "pl-9" : "pl-4"
				} ${
					errors[id]
						? "border-rose-300 focus:border-rose-400"
						: "border-neutral-600 focus:border-white"
				}`}
			/>
			<label
				className={`absolute Absans font-semibold text-md duration-150 transform -translate-y-3 top-5 z-10 origin-[0] ${
					formatPrice ? "left-9" : "left-4"
				} peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 ${
					errors[id] ? "text-rose-300" : "text-zinc-400"
				}`}
			>
				{label}
			</label>
		</div>
	);
};

export default Input;
