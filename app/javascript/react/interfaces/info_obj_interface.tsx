import MonthlyData from "./monthly_data_interface";

interface InfoObj extends MonthlyData {
	average_revenue: number;
	number_of_companies: number;
	info_obj: boolean;
}

export default InfoObj;