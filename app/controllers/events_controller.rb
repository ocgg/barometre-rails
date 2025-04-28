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

  # REQUIRED: return the start and end limits of the collection as a 2 items array
  def pagy_calendar_period(collection)
    starting = collection.minimum(:date)
    ending = collection.maximum(:date)
    [ starting.in_time_zone, ending.in_time_zone ]
  end

  # REQUIRED: return the collection filtered by a time period
  def pagy_calendar_filter(collection, from, to)
    collection.where(date: from...to)
  end

  # OPTIONAL: return the array counts per time
  def pagy_calendar_counts(collection, unit, from, to)
    collection.group_by_period(unit, :date, range: from...to).count.values
  end

  def set_events
    events = authorize policy_scope(Event)
    @calendar, @pagy, @events = pagy_calendar(events, day: {}, pagy: {})
    set_events_days
  end

  def set_events_days
    @events_days = @events.group_by do |event|
      date = event.date
      Date.new(date.year, date.month, date.day)
    end
  end
end
