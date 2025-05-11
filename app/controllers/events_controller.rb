class EventsController < ApplicationController
  allow_unauthenticated_access
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

  def new
    @events = [Event.new]
    authorize Event
  end

  def create
    authorize Event
    raise

    @events = events_params.map do |attr|
      # check if venue exists
      venue_attr = attr.delete(:venue)
      # if not, create it
      # then create event
      Event.new(attr)
    end

    if @events.all?(&:valid?)
      raise "TODO"
    else
      render :new, status: :unprocessable_entity
    end
  end

  # def edit
  # end

  # def update
  # end

  def verify
    @event.update(verified: true)
    render @event
  end

  def destroy
    @event.destroy
  end

  private

  def set_events
    @query_params = request.query_parameters.compact_blank
    @events = Event.filter_with_params(@query_params)
    @events = authorize policy_scope(@events)
    @pagy, @events = pagy(@events, limit: 50, count: @events.count)
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

  def events_params
    params.expect(events: [[:name, :description, :tarif, {venue: [:name]}]])
  end
end
