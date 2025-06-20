class AddDatetimeAndRemoveDateAndTimeFromEvents < ActiveRecord::Migration[8.0]
  def change
    add_column :events, :datetime, :datetime, null: false
    remove_column :events, :date
    remove_column :events, :time
  end
end
