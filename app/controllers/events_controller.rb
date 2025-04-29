class EventsController < ApplicationController
  allow_unauthenticated_access
  before_action :set_params, only: %i[index map calendar]
  before_action :set_events, only: %i[index map calendar]
  before_action :set_event, only: %i[verify destroy]

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

  def set_params
    if params[:start].present?
      @start = Date.strptime(params[:start], "%m-%d-%Y")
      @end = params[:end].present? ? Date.strptime(params[:end], "%m-%d-%Y") : @start
      @end += 1.day
    end
    if params[:q].present?
      @q = params[:q]
    end
  end

  def set_events
    events = @start ? Event.between(@start, @end) : Event
    events = events.search(@q) if @q
    events = authorize policy_scope(events)

    @pagy, @events = pagy(events, limit: 20)
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
