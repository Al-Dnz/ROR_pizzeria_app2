class Company < ApplicationRecord
	has_many :monthly_results, dependent: :delete_all

	validates :name, presence: true ,length: { minimum: 3 }
	validates :name, uniqueness: true
		{message: 'A pizzeria with name %{value} already exists'}
end
