module MonthlyResultToolbox

	# List all the years of all monthly result instances in db
	def MonthlyResult.available_years
		MonthlyResult.distinct.pluck(Arel.sql("EXTRACT(year FROM date)")).map(&:to_i).sort
	end
end