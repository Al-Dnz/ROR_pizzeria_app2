class MonthlyResultsController < ApplicationController

	def available_years
		res = MonthlyResult.available_years
		render json: res.to_json, status: :ok
	end
end
