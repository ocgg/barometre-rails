class AddNormalizedFieldsToVenues < ActiveRecord::Migration[8.0]
  def change
    add_column :venues, :normalized_fields, :string
  end
end
