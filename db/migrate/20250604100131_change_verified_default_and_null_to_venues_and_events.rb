class ChangeVerifiedDefaultAndNullToVenuesAndEvents < ActiveRecord::Migration[8.0]
  def change
    change_column :venues, :verified, :boolean, null: false, default: false
    change_column :events, :verified, :boolean, null: false, default: false
  end
end
