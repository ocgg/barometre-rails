class EventsController < ApplicationController
  allow_unauthenticated_access only: %i[index map calendar new create]
  before_action :set_events, only: %i[index calendar]
  before_action :set_event, only: %i[show verify edit update destroy]
  layout "layouts/map", only: :map

  include Pagy::Backend

  def index
    respond_to do |format|
      format.turbo_stream {
        render turbo_stream: turbo_stream.append(:events_days_container, partial: "events_list")
      }
      format.html
    end
  end

  def map
    params[:start] ||= Date.today.strftime("%d-%m-%Y")
    params[:end] = params[:start]
    @events = Event.filter_with_params(params)
    venue_columns = %w[id name address latitude longitude]
    @events = authorize policy_scope(@events)
    @venues = Venue.select(venue_columns).where(id: @events.select(:venue_id))
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

    respond_to do |format|
      format.turbo_stream {
        render turbo_stream: turbo_stream.append(:events_days_container, partial: "events_list")
      }
      format.html
    end
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
      flash[:notice] = "Vos événements ont bien été envoyés !"
      flash[:subtext] = "Ils devront être validés par un admin avant d'être visibles par tout le monde."
      redirect_to root_path
    else
      render :new, status: :unprocessable_content
    end
  end

  def edit
  end

  def update
    attrs = set_event_attributes(event_params)
    if @event.update(attrs)
      redirect_to @event
    else
      render :edit, status: :unprocessable_content
    end
  end

  def verify
    if @event.venue.verified?
      @event.update(verified: true)
      render @event if turbo_frame_request?
    else
      render_unprocessable_content_error
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
  end

  def set_event
    @event = authorize Event.find(params[:id])
  end

  def event_params
    params.expect(event: [
      :name, :description, :tarif, :date, :time, :venue_id,
      {venue_attributes: [:name, :address, :zipcode, :city]}
    ])
  end

  def events_params
    params.expect(events: [[
      :date, :time, :name, :description, :tarif, :venue_id,
      {venue_attributes: [:name, :address, :zipcode, :city]}
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
      attr[:date] = Date.strptime(attr[:date], "%d-%m-%Y")
    end
    if attr[:time]
      attr[:time] = Time.zone.parse(attr[:time])
    end
    venue_attr = attr.delete(:venue_attributes)&.compact_blank
    venue_attr.present? ? attr.merge(venue: Venue.find_or_create_by(venue_attr)) : attr
  end
end
