class ChangeCoordinatesOfVenues < ActiveRecord::Migration[8.0]
  def change
    remove_columns :venues, :lat, :long, type: :string

    add_column :venues, :latitude, :float
    add_column :venues, :longitude, :float
  end
end
