class AddNormalizedFieldsToEvents < ActiveRecord::Migration[8.0]
  def change
    add_column :events, :normalized_fields, :string
  end
end
