const Button = ({ disabled, label, onClick, outline }) => {
	return (
		<button
			disabled={disabled}
			onClick={onClick}
			className={`w-full py-3 font-bold border-2 rounded-lg Absans transition ${
				outline
					? "bg-white border-black text-black hover:bg-neutral-100"
					: "bg-rose-300 border-rose-300 text-black hover:bg-rose-400"
			} ${disabled ? "opacity-70 cursor-not-allowed" : ""}`}
		>
			{label}
		</button>
	);
};

export default Button;
