class AdminPagesController < ApplicationController
  def unverified
    authorize Event
    @unverified_events_count = Event.where(verified: false).count
    @unverified_venues_count = Venue.where(verified: false).count
  end
end
