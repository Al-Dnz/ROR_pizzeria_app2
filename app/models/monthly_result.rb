class MonthlyResult < ApplicationRecord
	belongs_to :company
	before_validation -> (result) { result.date = result.date.end_of_month }

	validates :date, presence: true
	validates :date, uniqueness: { scope: :company_id }
		{message: 'A monthly value with this date still exists'}		
	validates :revenue, presence: true, numericality: { greater_than_or_equal_to: 0, less_than: BigDecimal(10**6) }
	validate :company_id_exists
		{message: 'Associated company does not exist'}	
  
	def company_id_exists
		return false if Company.find_by_id(self.company_id).nil?
		true
	end

end
