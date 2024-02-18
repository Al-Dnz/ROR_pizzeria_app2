import React, { useState } from 'react';

interface SelectYearProps {
	years: number[];
	defaultYear: string;
	goBackDatas: any;
}

const SelectYear = ( {years, defaultYear, goBackDatas}: SelectYearProps) => {
	const [selectedYear, setSelectedYear] = useState(defaultYear);

	const handleChange = (event: any) => {
		const selectedValue = event.target.value;
		setSelectedYear(selectedValue);
		goBackDatas(`${selectedValue}`);
	};

	return (
		<div>
			<h2>Année</h2>
			<select  value={selectedYear} onChange={handleChange}>
				{years.map((year: number, index: number) => (
					<option key={index} value={year}>
						{year}
					</option>
				))}
			</select>
		</div>
	);
};

export default SelectYear;
