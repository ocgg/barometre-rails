class VenuesController < ApplicationController
  allow_unauthenticated_access only: %i[index show]
  before_action :set_venue, only: %i[show edit update verify destroy]

  def index
    @venues = Venue.filter_by_query(params[:q])
      .limit(params[:limit])
      .order_by(params[:order])
    @venues = authorize policy_scope(@venues)

    respond_to do |format|
      format.html {
        require_authentication && return unless authenticated?
        render slim: @venues
      }
      format.json { render json: @venues.to_json }
    end
  end

  def unverified
    @venues = authorize Venue.all_unverified
  end

  def show
    respond_to do |format|
      format.json { render json: @venue.to_json }
      format.html { render partial: @venue if turbo_frame_request? }
    end
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
      render :edit, status: :unprocessable_entity
    end
  end

  def destroy
    @venue.destroy
  end

  private

  def set_venue
    @venue = authorize Venue.find(params[:id])
  end

  def venue_params
    params.expect(venue: [:name, :address, :city])
  end
end
