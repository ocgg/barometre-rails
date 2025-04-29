class EventsController < ApplicationController
  allow_unauthenticated_access
  before_action :set_events, only: %i[index map calendar]
  before_action :set_event, only: %i[verify destroy]

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

  def verify
    @event.update(verified: true)
    render @event
  end

  def destroy
    message = "Supprimé: #{@event.name} (#{@event.venue.name}, #{@event.venue.city})"
    replacing_frame = "<p class=\"text-fgcolor-faded text-center text-sm\">#{message}</p>"
    @event.destroy
    render turbo_stream: [turbo_stream.replace(@event, replacing_frame)]
  end

  private

  def set_events
    events = authorize policy_scope(Event)
    @calendar, @pagy, @events = pagy_calendar(events, month: {}, pagy: {limit: 100})
    @next_month_page = @calendar[:month].next
    set_events_days
  end

  def set_events_days
    @events_days = @events.group_by do |event|
      date = event.date
      Date.new(date.year, date.month, date.day)
    end
  end

  def set_event
    @event = authorize Event.find(params[:id])
  end
end
