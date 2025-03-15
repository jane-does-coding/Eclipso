const Heading = ({ title, subtitle }) => {
	return (
		<div className="flex flex-col gap-2">
			<h1 className="text-2xl font-bold text-white Absans">{title}</h1>
			<h2 className="text-neutral-300 Absans">{subtitle}</h2>
		</div>
	);
};

export default Heading;
