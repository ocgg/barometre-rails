class EventsController < ApplicationController
  allow_unauthenticated_access
  before_action :set_events, only: %i[index map calendar]

  include Pagy::Backend

  def index
  end

  def unverified
    @events = authorize Event.unverified_upcoming
    set_events_days
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
    @pagy, @events = pagy(policy_scope(Event), limit: 5)
    authorize @events
    set_events_days
  end

  def set_events_days
    @events_days = @events.group_by do |event|
      date = event.date
      Date.new(date.year, date.month, date.day)
    end
  end
end
