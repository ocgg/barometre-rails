class VenuesController < ApplicationController
  allow_unauthenticated_access except: %i[unverified verify destroy]
  before_action :set_venue, only: %i[show verify destroy]

  def index
    @venues = Venue.filter_by_query(params[:q])
    @venues = authorize policy_scope(@venues)
    respond_to do |format|
      format.html { render slim: @venues }
      format.json { render json: @venues.to_json }
    end
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
