import * as React from "react";
import * as ReactDOM from "react-dom/client";
import Table from "./table";
import SelectYear from "./select_year_component";
import fetchData from "./fecth_data_util"; 

const App = ({ arg }) => {
	const [dataset, setDataSet] = React.useState(arg.dataset);
	const [error, setError] = React.useState(arg.error);

	const updateDataSet = async (newYear) => {
		let newDataset;
		try {
			newDataset = await fetchData(`${arg.targetApiUrl}`,`${newYear}`);
		} catch (err) {
			let newError = {
				status: true,
				message: err.message
			}
			setError(newError);
			return;
		}
		setDataSet(newDataset);
	};

	const  renderRegular = (
		<div> 
			<SelectYear years={arg.years_arr}  
						defaultYear={arg.current_year} 
						goBackDatas={updateDataSet} 
			/>
			<br />
			<Table dataset={dataset}/> 
		</div>
	)

	const renderError = (
		<div> 
			<h3>⚠️ Error in fetching datas</h3>
			{ error.message }
		</div>
	)

	return  error.status == true ? renderError : renderRegular
	
}

const currentYear = (years_arr) => {
	const year = new Date().getFullYear();
	return years_arr.includes(year) ? `${year}` : `${years_arr[years_arr.length - 1]}`;
}

document.addEventListener("DOMContentLoaded", async () => {
	const rootDiv = document.getElementById("root")!
	const root = ReactDOM.createRoot(rootDiv);

	const targetApiUrl = "http://localhost:3000/yearly_data"

	let error =
	{
		status: false,
		message: ''
	}
	let dataset, years_arr, current_year;
	
	try {
		years_arr = await fetchData("http://localhost:3000/available_years");
		current_year = currentYear(years_arr);
		dataset = await fetchData(targetApiUrl ,`${current_year}`);
	} catch (err) {
		error.status = true;
		error.message = err.message
	}

	const obj =
	{
		dataset: dataset || [],
		years_arr: years_arr || [],
		current_year: current_year,
		targetApiUrl: targetApiUrl,
		error: error
	}	
	root.render(<App arg= { obj } />);
});