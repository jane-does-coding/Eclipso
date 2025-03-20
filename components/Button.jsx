const Button = ({ disabled, label, onClick, outline }) => {
	return (
		<button
			disabled={disabled}
			onClick={onClick}
			className={`w-full py-3 font-bold border-2 rounded-lg Absans transition ${
				outline
					? "bg-white border-black text-black hover:bg-neutral-100"
					: "bg-green-400 border-green-400 text-black hover:bg-green-500"
			} ${disabled ? "opacity-70 cursor-not-allowed" : ""}`}
		>
			{label}
		</button>
	);
};

export default Button;
