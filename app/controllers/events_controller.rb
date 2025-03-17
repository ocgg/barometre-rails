class EventsController < ApplicationController
  allow_unauthenticated_access
  before_action :set_events, only: %i[index map calendar]

  def index
  end

  def unverified
    @events = authorize Event.unverified_upcoming
  end

  def map
  end

  def calendar
  end

  # def new
  # end
  #
  # def create
  # end
  #
  # def edit
  # end
  #
  # def update
  # end
  #
  # def destroy
  # end

  private

  def set_events
    @events = authorize policy_scope(Event)
  end
end
