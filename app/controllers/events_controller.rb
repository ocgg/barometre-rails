class EventsController < ApplicationController
  allow_unauthenticated_access except: %i[unverified verify destroy]
  before_action :set_events, only: %i[index map calendar]
  before_action :set_event, only: %i[show verify edit update destroy]

  include Pagy::Backend

  def index
  end

  def map
  end

  def calendar
  end

  def show
    if turbo_frame_request?
      render partial: @event
    end
  end

  def unverified
    @query_params = request.query_parameters.compact_blank
    @events = Event.filter_unverified_with_params(@query_params)
    @events = authorize policy_scope(@events)
    @pagy, @events = pagy(@events, limit: 50, count: @events.count)
    set_events_days
  end

  def new
    @events = [Event.new(venue: Venue.new)]
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

  def edit
  end

  def update
    event_attrs = set_event_attributes(event_params)
    if @event.update(event_attrs)
      redirect_to @event
    else
      render :edit, status: :unprocessable_entity
    end
  end

  def verify
    if @event.venue.verified?
      @event.update(verified: true)
      render @event
    else
      # Should never happen
      render_unprocessable_entity_error
    end
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

  def event_params
    params.expect(event: [
      "name", "description", "tarif", "date", "time", "venue_id",
      {venue_attributes: [:name, :address, :city]}
      ])
  end

  def events_params
    params.expect(events: [[
      :date, :time, :name, :description, :tarif, :venue_id,
      {venue_attributes: [:name, :address, :city]}
    ]])
  end

  def set_new_events
    events_params.map do |attr|
      attr.compact_blank!
      Event.new(set_event_attributes(attr))
    end
  end

  def set_event_attributes(attr)
      if attr[:date]
        m_d_y = attr[:date].split("-").map(&:to_i)
        attr[:date] = Date.new(m_d_y[2], m_d_y[0], m_d_y[1])
      end
      if attr[:time]
        h_m = attr[:time].split(":")
        d = attr[:date] || Time.now
        attr[:time] = Time.new(d.year, d.month, d.day, h_m[0], h_m[1])
      end
      venue_attr = attr.delete("venue_attributes")
      venue_attr ? attr.merge(venue: Venue.find_or_create_by(venue_attr)) : attr
  end
end
