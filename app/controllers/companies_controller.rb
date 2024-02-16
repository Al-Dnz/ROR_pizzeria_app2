class CompaniesController < ApplicationController
	before_action :valid_year_param, only: [:yearly_data]
	before_action :available_data, only: [:yearly_data]

	def yearly_data
		year = params[:year]
		render json: Company.serialize_yearly_data(year), status: :ok
	end

	private

	def valid_year_param
		if !params[:year].match?(/\A\d{4}\z/)
			render json: { error: "year param must be valid (format YYYY)" }, status: :bad_request
		end
	end

	def available_data
		year = params[:year]
		if MonthlyResult.where("EXTRACT(year FROM date) = #{year}").empty?
			render json: { error: "no datas available for year #{year}" }, status: :not_found
		end
	end
end
