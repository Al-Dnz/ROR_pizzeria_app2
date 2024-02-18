class MonthlyResult < ApplicationRecord
	require 'date'
	include  MonthlyResultToolbox
	belongs_to :company
	before_validation -> (result) { result.date = result.date.end_of_month rescue date }

	validates :date, presence: true, date: true
	validates :date, date: { before: Proc.new { (Time.now + 1.month ).beginning_of_month} }
	validates :date, uniqueness: { scope: :company_id }
	validates :revenue, presence: true, numericality: { greater_than: 0, less_than: BigDecimal(10**6) }
	

end
