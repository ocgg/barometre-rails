class VenuesController < ApplicationController
  allow_unauthenticated_access except: %i[unverified verify destroy]
  before_action :set_venue, only: %i[show verify destroy]

  def index
    @venues = authorize Venue.filter_by_query(params[:q])
    render json: @venues.to_json
  end

  def unverified
    @venues = authorize Venue.where(verified: false)
  end

  def show
    render json: @venue.to_json
  end

  def verify
    @venue.update(verified: true)
    render @venue
  end

  # def edit
  # end

  # def update
  # end

  def destroy
    @venue.destroy
  end

  private

  def set_venue
    @venue = authorize Venue.find(params[:id])
  end
end
