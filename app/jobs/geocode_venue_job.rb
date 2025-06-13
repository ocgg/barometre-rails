class GeocodeVenueJob < ApplicationJob
  queue_as :default

  def perform(venue)
    venue.geocode
  end
end
