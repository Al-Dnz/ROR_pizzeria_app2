import React, { useState } from 'react';

import ApiFetchComponent from './api_fetch_component'


// const YearSelectComponent = () => {
//   const [selectedYear, setSelectedYear] = useState('');
//   const [data, setData] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);

//   const handleYearChange = async (e) => {
//     const year = e.target.value;
//     setSelectedYear(year);
//     setLoading(true);
// 	<ApiFetchComponent arg="2020"/>}

// 	return 
// 	(
// 		<div>
// 		<h2>Sélectionnez une année :</h2>
// 		<select value={selectedYear} onChange={handleYearChange}>
// 			<option value="">Sélectionnez une année</option>
// 			{/* {Array.from({ length: 10 }, (_, index) => new Date().getFullYear() - index).map((year) => (
// 			<option key={year} value={year}>{year}</option>
// 			))} */}
// 		</select>
// 		</div>
// 	)
	


// };


function YearSelectComponent() {
	<ApiFetchComponent arg="2020"/>

	const fetchData = async (arg) => {
		  const response = await fetch(`http://localhost:3000/yearly_data/${arg}`);
		  if (!response.ok) {
			throw new Error('Erreur lors de la récupération des données');
		  }
		  const jsonData = await response.json();
		  console.log(jsonData);
	  }
	

	const handleYearChange = async (e) => {
		console.log(e.target.value);
		const selected_year = e.target.value;
		const response = await fetch(`http://localhost:3000/yearly_data/${selected_year}`);
		if (!response.ok) {
		  throw new Error('Erreur lors de la récupération des données');
		}
		const jsonData = await response.json();
		console.log("hello");
		
	}

	return (
	  <label>
		Pick a year:
		<select name="selectedYear" defaultValue="2020" onChange={ handleYearChange}>
		  <option value="2020">2020</option>
		  <option value="2021">2021</option>
		  <option value="2022">2022</option>
		</select>
	  </label>
	);
  }

export default YearSelectComponent;
