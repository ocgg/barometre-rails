class AddZipcodeToVenues < ActiveRecord::Migration[8.0]
  def change
    add_column :venues, :zipcode, :string, null: false
  end
end
