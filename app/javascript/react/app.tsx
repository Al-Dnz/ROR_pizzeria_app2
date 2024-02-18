import * as React from "react";
import * as ReactDOM from "react-dom/client";
import Table from "./components/table_component";
import SelectYear from "./components/select_year_component";
import fetchData from "./utils/fecth_data_util"; 
import MonthlyData from "./interfaces/monthly_data_interface";
import InfoObj from "./interfaces/info_obj_interface";

const App = ({ arg }) => {
	const [dataset, setDataSet] = React.useState(arg.dataset);
	const [error, setError] = React.useState(arg.error);

	const updateDataSet = async (newYear: string) => {
		let newDataset: (MonthlyData|InfoObj)[];
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

	const renderRegular = (
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

const currentYear = (years_arr: number[]) => {
	const year = new Date().getFullYear();
	return years_arr.includes(year) ? `${year}` : `${years_arr[years_arr.length - 1]}`;
}

document.addEventListener("DOMContentLoaded", async () => {
	const rootDiv = document.getElementById("root")!
	const root = ReactDOM.createRoot(rootDiv);

	const targetApiUrl = "http://localhost:3000/yearly_data";
	const yearsApiUrl = "http://localhost:3000/available_years";

	let error: {status: boolean, message: string}  =
	{
		status: false,
		message: ''
	}
	let dataset:(MonthlyData|InfoObj)[] = [];
	let years_arr: number[] = [];
	let current_year: string = "";
	
	try {
		years_arr = await fetchData(yearsApiUrl);
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