module MonthlyResultToolbox

	def MonthlyResult.available_years
		MonthlyResult.distinct.pluck(Arel.sql("EXTRACT(year FROM date)")).map(&:to_i)
	end
end