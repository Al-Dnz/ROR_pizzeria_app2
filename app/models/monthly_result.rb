class MonthlyResult < ApplicationRecord
	belongs_to :company
	before_validation -> (result) { result.date = result.date.end_of_month }

end
