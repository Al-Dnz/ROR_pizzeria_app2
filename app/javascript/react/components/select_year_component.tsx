import React, { useState } from 'react';

interface YearsArray {
	years: string[];
}

const SelectYear = ( {years, defaultYear, goBackDatas} ) => {
  const [selectedYear, setSelectedYear] = useState(defaultYear);

  const handleChange = (event) => {
    const selectedValue = event.target.value;
    setSelectedYear(selectedValue);
	goBackDatas(selectedValue);
  };

  return (
    <div>
      <h2>Année</h2>
      <select  value={selectedYear} onChange={handleChange}>
        {years.map((year, index) => (
          <option key={index} value={year}>{year}</option>
        ))}
      </select>
    </div>
  );
};

export default SelectYear;
