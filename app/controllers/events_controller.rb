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
    params.expect(events: [[:date, :time, :name, :description, :tarif, :venue_id, {venue_attributes: [:name, :address, :city]}]])
  end

  def set_new_events
    events_params.map do |attr|
      if attr[:date] && attr[:time]
        m_d_y = attr[:date].split("-")
        h_m = attr[:time].split(":")
        date = Time.new(m_d_y[2], m_d_y[0], m_d_y[1], h_m[0], h_m[1])
        attr.delete(:time)
        attr.delete(:date)
        Event.new(date:, **attr)
      else
        attr.delete(:time)
        Event.new(**attr)
      end
    end
  end
end
