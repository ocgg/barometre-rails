class RemoveStyleFromEvents < ActiveRecord::Migration[8.0]
  def change
    remove_column :events, :style
  end
end
