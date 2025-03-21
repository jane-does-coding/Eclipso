// CircularProgress.js
const CircularProgress = ({ value }) => {
	const radius = 40;
	const circumference = 2 * Math.PI * radius;
	const offset =
		circumference - (Math.min(Math.max(value, 0), 100) / 100) * circumference;

	return (
		<div className="relative w-[250px] h-[250px] sm:w-[300px] sm:h-[300px]">
			<svg
				className="absolute top-0 left-0 w-full h-full"
				viewBox="0 0 100 100"
			>
				<circle
					cx="50"
					cy="50"
					r={radius}
					stroke="#444"
					strokeWidth="8"
					fill="none"
				/>
				<circle
					cx="50"
					cy="50"
					r={radius}
					stroke="oklch(0.792 0.209 151.711)"
					strokeWidth="8"
					fill="none"
					strokeDasharray={circumference}
					strokeDashoffset={offset}
					strokeLinecap="round"
				/>
				<text
					x="50"
					y="55"
					textAnchor="middle"
					fill="#FFFFFF"
					fontSize="20px"
					fontWeight="bold"
					className="Flazie"
				>
					{value}%
				</text>
			</svg>
		</div>
	);
};

export default CircularProgress; // Export the component
