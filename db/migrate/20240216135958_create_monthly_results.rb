class CreateMonthlyResults < ActiveRecord::Migration[7.0]
  def change
    create_table :monthly_results do |t|
	  t.date :date, null: false
	  t.decimal :revenue, precision: 10, scale: 2, null: false
	  t.references :company, null: false, foreign_key: true
  

      t.timestamps
    end
  end
end
