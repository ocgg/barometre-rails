class GeocodeVenueJob < ApplicationJob
  queue_as :default

  def perform(venue)
    print "Performing GeocodeVenueJob for venue #{venue.id}... "
    venue.geocode
    venue.save!
    puts venue.geocoded? ? "OK" : "FAILED"
  end
end
