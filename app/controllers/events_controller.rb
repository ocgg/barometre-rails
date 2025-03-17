class EventsController < ApplicationController
  allow_unauthenticated_access

  def index
    @events = authorize policy_scope(Event)
  end

  def unverified
    @events = authorize Event.unverified_upcoming
  end

  def map
  end

  def calendar
  end

  def new
  end

  def create
  end

  def edit
  end

  def update
  end

  def destroy
  end
end
