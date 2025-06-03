class AdminPagesController < ApplicationController
  def unverified
    @section_path = case params[:section]
    when "events" then unverified_events_path
    when "venues" then unverified_venues_path
    else unverified_events_path
    end
    authorize Event
    @unverified_events_count = Event.where(verified: false).count
    @unverified_venues_count = Venue.where(verified: false).count
  end
end
