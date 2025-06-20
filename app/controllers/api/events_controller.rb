class Api::EventsController < ApplicationController
  allow_unauthenticated_access only: %i[index show]

  EVENT_COLUMNS = %i[id name description tarif datetime]
  VENUE_COLUMNS = %i[id name address city latitude longitude]

  def index
    @query_params = request.query_parameters.compact_blank
    @events = authorize Event.filter_with_params(@query_params).verified_upcoming
    render json: @events,
      only: EVENT_COLUMNS,
      include: {venue: {only: VENUE_COLUMNS}}
  end

  def show
    @event = authorize Event.find(params[:id])
    render json: @event, only: EVENT_COLUMNS
  end
end
