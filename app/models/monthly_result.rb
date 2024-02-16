class MonthlyResult < ApplicationRecord
	before_validation -> (result) { result.date = result.date.end_of_month }

	
end
