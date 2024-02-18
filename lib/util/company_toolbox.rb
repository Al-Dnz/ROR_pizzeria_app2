module CompanyToolbox

	# Return the average yearly_revenue of the year between all available companies
	def Company.average_yearly_revenue(year)
		sprintf("%.2f",(Company.all.each.map {|company| company.yearly_revenue(year) || 0}.sum / Company.all.count).round(2))
	end

	# Set the data to produce the dataset that will be used in the frontend app
	def Company.serialize_yearly_data(year)
		arr = []
		Company.all.sort_by {|company| company.yearly_revenue(year)}.each do |company|
			 arr << company.yearly_data_hash(year)
		end
		hash = {}
		hash['title'] = 'Total'
		yearly_sum = 0
		for m in 1..12
			monthly_sum = MonthlyResult.where("EXTRACT(year FROM date) = ? AND EXTRACT(month FROM date) = ?", year, m).map{|res| res.revenue}.sum
			hash[Date::ABBR_MONTHNAMES[m].downcase] = monthly_sum.to_f
			yearly_sum += monthly_sum
		end
		hash['total'] = yearly_sum.to_f
		hash['number_of_companies'] = arr.size
		hash['average_revenue'] = Company.average_yearly_revenue(year)
		arr << hash
		JSON.generate(arr)
	end

	# List all companies that have balance sheets for this year
	def Company.list_of_year(year)
		Company.joins(:monthly_results).where('extract(year from monthly_results.date) = ?', year).distinct
	end

	# Return the yearly_revenue of the instance
	def yearly_revenue(year)
		return nil if monthly_results.where("EXTRACT(year FROM date) = ?", year).empty?
		monthly_results.where("EXTRACT(year FROM date) = ?", year).map{|res| res.revenue}.sum.to_f
	end

	# Return a hash with the name of the instance, the months results and the yearly revenue
	def yearly_data_hash(year)
		hash = {}
		hash['title'] = name
		monthly_results.where("EXTRACT(year FROM date) = ?", year).each do |result| 
			hash["#{Date::ABBR_MONTHNAMES[result.date.month].downcase}"] = sprintf("%.2f", result.revenue.to_f)
		end
		hash['total'] = sprintf("%.2f",yearly_revenue(year))
		hash
	end

end