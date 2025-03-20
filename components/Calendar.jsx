import React from "react";
import {
	format,
	startOfMonth,
	endOfMonth,
	startOfWeek,
	endOfWeek,
	addDays,
	isSameMonth,
} from "date-fns";

const Calendar = ({ habitData }) => {
	const today = new Date();
	const months = [0, -1, -2].map(
		(offset) => new Date(today.getFullYear(), today.getMonth() + offset, 1)
	);

	const renderMonth = (date) => {
		const monthStart = startOfMonth(date);
		const monthEnd = endOfMonth(date);
		const startDate = startOfWeek(monthStart);
		const endDate = endOfWeek(monthEnd);
		let day = startDate;
		let weeks = [];

		while (day <= endDate) {
			let days = [];
			for (let i = 0; i < 7; i++) {
				const formattedDate = format(day, "yyyy-MM-dd");
				const completion = habitData[formattedDate] || 0;
				const color =
					completion === 0
						? "bg-gray-600"
						: `bg-green-400 opacity-${Math.round(completion / 25) * 25}`;

				days.push(
					<div
						key={day}
						className={`w-10 h-10 flex items-center justify-center ${color} rounded-full text-white`}
					>
						{isSameMonth(day, monthStart) ? format(day, "d") : ""}
					</div>
				);
				day = addDays(day, 1);
			}
			weeks.push(
				<div key={day} className="flex justify-center gap-2">
					{days}
				</div>
			);
		}
		return (
			<div className="flex flex-col items-center mb-8">
				<h2 className="text-white text-xl mb-2">
					{format(monthStart, "MMMM yyyy")}
				</h2>
				{weeks}
			</div>
		);
	};

	return (
		<div className="flex flex-wrap justify-center gap-8">
			{months.map((month) => (
				<div key={format(month, "yyyy-MM")}>{renderMonth(month)}</div>
			))}
		</div>
	);
};

export default Calendar;
