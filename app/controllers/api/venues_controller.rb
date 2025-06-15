class Api::VenuesController < ApplicationController
  allow_unauthenticated_access only: %i[index show]

  VENUE_COLUMNS = %i[id name address city latitude longitude]

  def index
    @venues = authorize Venue.filter_by_query(params[:q])
      .limit(params[:limit])
      .order_by(params[:order])
      .all_verified
    render json: @venues, only: VENUE_COLUMNS
  end

  def show
    @venue = authorize Venue.find(params[:id])
    render json: @venue, only: VENUE_COLUMNS
  end
end
