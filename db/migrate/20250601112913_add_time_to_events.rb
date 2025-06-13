class AddTimeToEvents < ActiveRecord::Migration[8.0]
  def change
    add_column :events, :time, :time
    change_column :events, :date, :date
  end
end
