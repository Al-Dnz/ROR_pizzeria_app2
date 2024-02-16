class Company < ApplicationRecord

	validates :name, presence: true ,length: { minimum: 3 }
	validates :name, uniqueness: true
		{message: 'A pizzeria with name %{value} already exists'}
end
