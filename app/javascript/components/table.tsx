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

interface TableProps {
	dataset: MonthlyData[]
}

const Table = ( { dataset }: TableProps ) => {
  const companiesDataArr: MonthlyData[] = [];
  let infoObj;

  dataset.forEach(obj => {
    if (obj.title !== "Total") {
      companiesDataArr.push(obj);
    } else {
      infoObj = obj;
    }
  });

  const renderTableHeader = () => {
	const months = [
	  'Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin','Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'];
	return(
		<tr>
		  <th scope="col">Name</th>
		  {months.map((month, index) => (
			<th key={index} scope="col">{month} </th>
		  ))}
		  <th scope="col">Total CA</th>
		</tr>
	);
  };

  const renderMonthColumns = (obj: MonthlyData) => {
    const months = ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec'];
    return months.map(month => (
      <td key={`${obj.title}_${month}_th`}>
		 { obj[month]? <span> {obj[month]} €</span> : <span> NC. </span> } 
		</td>
    ));
  };

  const averageBasedColor = (obj, infoObj) => {
	return obj.total > infoObj.average_revenue ? "text-success" : "text-warning";
  }

  return (
	<div>
		<b>{infoObj.number_of_companies} pizzeria(s) trouvée(s)</b>
    <div className="table-responsive">
      <table className="table table-bordered table-striped">

        <thead className="thead-light">
          {renderTableHeader()}
        </thead>

        <tbody>
          {companiesDataArr.map((obj, index) => (
            <tr key={`${obj.title}_tr`}>
              <th scope="row" key={`${obj.title}_title_th`}>{obj.title}</th>
             		{renderMonthColumns(obj)}
              <td className={averageBasedColor(obj, infoObj)} key={`${obj.title}_total_th`}>{obj.total} €</td>
            </tr>
          ))}
        </tbody>

        <tfoot>
          <tr>
            <td colSpan={13}></td>
            <th>CA Moyen: {infoObj?.average_revenue} €</th>
          </tr>
        </tfoot>
		
      </table>
    </div>
	</div>
  );
};

export default Table;