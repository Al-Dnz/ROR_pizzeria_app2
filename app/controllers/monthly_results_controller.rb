class MonthlyResultsController < ApplicationController

	def available_years
		res = MonthlyResult.available_years
		if !res.empty? 
			render json: res.to_json, status: :ok
		else
			render json: { error: "no datas available" }, status: :not_found
		end
	end
end
