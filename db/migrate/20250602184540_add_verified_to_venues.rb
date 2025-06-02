class AddVerifiedToVenues < ActiveRecord::Migration[8.0]
  def change
    add_column :venues, :verified, :boolean, default: false
  end
end
