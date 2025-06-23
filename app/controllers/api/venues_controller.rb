class Api::VenuesController < ApplicationController
  allow_unauthenticated_access only: %i[index show]

  VENUE_COLUMNS = %i[id name address zipcode city latitude longitude verified]

  def index
    @venues = Venue.filter_by_query(params[:q])
      .limit(params[:limit])
      .order_by(params[:order])
    @venues = authorize policy_scope(@venues)
    render json: @venues, only: VENUE_COLUMNS
  end

  def show
    @venue = authorize Venue.find(params[:id])
    render json: @venue, only: VENUE_COLUMNS
  end
end
