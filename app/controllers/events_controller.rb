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

    @events = set_new_events

    valid = @events.map(&:valid?)

    if valid.all?
      @events.each(&:save)
      redirect_to root_path
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
    params.expect(events: [[:date, :name, :description, :tarif, {venue: [:id, :name, :address, :city]}]])
  end

  def set_new_events
    events_params.map do |attr|
      venue_attr = attr.delete(:venue).compact_blank
      venue = if venue_attr[:id] then Venue.find(venue_attr[:id])
      elsif venue_attr.present? then Venue.new(venue_attr)
      end
      # if venue don't exist, create it
      # then create event
      date = attr[:date].present? && Time.new("#{attr[:date]}:00")
      Event.new(venue:, date:, **attr)
    end
  end
end
