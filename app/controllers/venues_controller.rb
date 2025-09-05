class VenuesController < ApplicationController
  # allow_unauthenticated_access only: %i[]
  before_action :set_venue, only: %i[show edit update verify destroy geocode]

  def index
    @venues = Venue.filter_by_query(params[:q])
      .limit(params[:limit])
      .order_by(params[:order])
    @venues = authorize policy_scope(@venues)
  end

  def unverified
    @venues = authorize Venue.all_unverified
  end

  def show
    render partial: @venue if turbo_frame_request?
  end

  def verify
    @venue.update(verified: true)
    render @venue
  end

  def edit
  end

  def update
    if @venue.update(venue_params)
      redirect_to @venue
    else
      render :edit, status: :unprocessable_content
    end
  end

  def destroy
    @venue.destroy
  end

  def geocode
    @venue.geocode_later
  end

  private

  def set_venue
    @venue = authorize Venue.find(params[:id])
  end

  def venue_params
    params.expect(venue: [:name, :address, :zipcode, :city])
  end
end
