module CompanyToolbox

	def Company.average_yearly_revenue(year)
		Company.all.each.map {|company| company.yearly_revenue(year) || 0}.sum / Company.all.count
	end

	def Company.serialize_yearly_data(year)
		arr = []
		Company.all.each do |company|
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
		arr << hash
		JSON.generate(arr)
	end

	def yearly_revenue(year)
		return nil if monthly_results.where("EXTRACT(year FROM date) = ?", year).empty?
		monthly_results.where("EXTRACT(year FROM date) = ?", year).map{|res| res.revenue}.sum.to_f
	end

	def yearly_data_hash(year)
		hash = {}
		hash['title'] = name
		monthly_results.where("EXTRACT(year FROM date) = ?", year).each do |result| 
			hash["#{Date::ABBR_MONTHNAMES[result.date.month].downcase}"] = result.revenue.to_f 
		end
		hash['total'] = yearly_revenue(year)
		hash
	end

end