class EventsController < ApplicationController
  allow_unauthenticated_access
  before_action :set_events, only: %i[index map calendar]

  include Pagy::Backend
  include PagyCalendar

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
    events = authorize policy_scope(Event)
    @calendar, @pagy, @events = pagy_calendar(events, week: {}, pagy: {limit: false})
    @next_week_page = @calendar[:week].next
    set_events_days
  end

  def set_events_days
    @events_days = @events.group_by do |event|
      date = event.date
      Date.new(date.year, date.month, date.day)
    end
  end
end
