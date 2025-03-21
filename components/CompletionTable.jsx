import React from "react";
import { format, subDays } from "date-fns";

const CompletionTable = ({ habitData }) => {
	const today = new Date();
	const daysToShow = 30; // Number of days to show in the table

	// Generate an array of the last 30 days
	const dates = Array.from({ length: daysToShow }, (_, i) =>
		subDays(today, daysToShow - i - 1)
	);

	return (
		<div className="overflow-x-auto">
			<table className="min-w-full bg-[#262627] text-white border-collapse">
				<thead>
					<tr>
						<th className="px-4 py-2 border border-gray-600">Date</th>
						<th className="px-4 py-2 border border-gray-600">Completion</th>
					</tr>
				</thead>
				<tbody>
					{dates.map((date) => {
						const formattedDate = format(date, "yyyy-MM-dd");
						const completion = habitData[formattedDate] || 0;

						return (
							<tr key={formattedDate}>
								<td className="px-4 py-2 border border-gray-600 text-center">
									{format(date, "MMM dd, yyyy")}
								</td>
								<td className="px-4 py-2 border border-gray-600 text-center">
									{completion}%
								</td>
							</tr>
						);
					})}
				</tbody>
			</table>
		</div>
	);
};

export default CompletionTable;
