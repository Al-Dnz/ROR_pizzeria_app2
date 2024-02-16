import React from 'react';


interface MonthlyData {
	title: string;
	jan: number;
	feb: number;
	mar: number;
	apr: number;
	may: number;
	jun: number;
	jul: number;
	aug: number;
	sep: number;
	oct: number;
	nov: number;
	dec: number;
	total: number;
}

const Table = ({dataset}) => {

	let i = 0;

	const companies_data_arr: MonthlyData[] = [];
	let total_obj; 

	dataset.forEach(function(obj) {
		if (obj.title != "Total")
			companies_data_arr.push(obj);
		else
			total_obj = obj;
	});

	

	return (
		<div className="dataTable">
			<table>
			<thead>
					<tr>
						<th>Name</th>
						<th>Janvier</th>
						<th>Février</th>
						<th>Mars</th>
						<th>Avril</th>
						<th>Mai</th>
						<th>Juin</th>
						<th>Juillet</th>
						<th>Août</th>
						<th>Septembre</th>
						<th>Octobre</th>
						<th>Novembre</th>
						<th>Décembre</th>
						<th>Total CA</th>
					</tr>
					</thead>
					<tbody>
				
					{
						companies_data_arr.map((obj, index) =>
						(
								<tr key = {obj.title + "_tr"}>
									<th key={obj.title + '_' + "title_th"}>{obj.title}</th>
									<th key={obj.title + '_' + "jan_th"}>{obj.jan}</th>
									<th key={obj.title + '_' + "feb_th"}>{obj.feb}</th>
									<th key={obj.title + '_' + "mar_th"}>{obj.mar}</th>
									<th key={obj.title + '_' + "apr_th"}>{obj.apr}</th>
									<th key={obj.title + '_' + "may_th" }>{obj.may}</th>
									<th key={obj.title + '_' + "jun_th" }>{obj.jun}</th>
									<th key={obj.title + '_' + "jul_th" }>{obj.jul}</th>
									<th key={obj.title + '_' + "aug_th" }>{obj.aug}</th>
									<th key={obj.title + '_' + "sep_th" }>{obj.sep}</th>
									<th key={obj.title + '_' + "oct_th" }>{obj.oct}</th>
									<th key={obj.title + '_' + "nov_th" }>{obj.nov}</th>
									<th key={obj.title + '_' + "dec_th" }>{obj.dec}</th>
									<th key={obj.title + '_' + "total_th" }>{obj.total}</th>
								</tr>
						))
					
					}
				</tbody>
				
				<tfoot>
				<tr>
					{/* [...Array(8)].map((obj, index) => (<td></td>)) */}
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					<td></td>
					
					<td>CA MOYEN: {total_obj.total}</td>
				</tr>
				</tfoot>	
			
				
			</table>
		</div>


	);
}


export default Table