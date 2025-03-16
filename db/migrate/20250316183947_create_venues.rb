class CreateVenues < ActiveRecord::Migration[8.0]
  def change
    create_table :venues do |t|
      t.string :name
      t.string :city
      t.string :address
      t.string :lat
      t.string :long

      t.timestamps
    end
  end
end
