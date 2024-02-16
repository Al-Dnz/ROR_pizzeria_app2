require 'faker'

def companies_gen(number_of_companies)
	i = 0
	number_of_companies.times do 
		company = Company.new(name: "#{Faker::Fantasy::Tolkien.location}")
		i += 1 if company.save
	end
	puts "seeds.rb: #{i} Company instances have been created"
end

def monthly_results_gen(year, ending_year)
	i = 0
	while year <= ending_year
		month = 1
		while month <= 12
			Company.all.each do |company|
				result = MonthlyResult.new(
					date: "01/#{month}/#{year}" ,
					revenue: rand(50.00...1000.00),
					company_id: company.id
				)
			i += 1 if result.save
			end
			month += 1
		end
		year += 1
	end
	puts "seeds.rb: #{i} MonthlyResult instances have been created"
end

year = 2020
ending_year = 2022
number_of_companies = 2

companies_gen(number_of_companies)
monthly_results_gen(year, ending_year)
