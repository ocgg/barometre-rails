class AdminPagesController < ApplicationController
  def unverified
    @section_path = case params[:section]
    when "events" then unverified_events_path
    when "venues" then unverified_venues_path
    else unverified_events_path
    end
    authorize Event
  end
end
