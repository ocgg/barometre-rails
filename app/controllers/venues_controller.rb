class VenuesController < ApplicationController
  allow_unauthenticated_access only: %i[index show]
  before_action :set_venue, only: %i[show edit update verify destroy remove_duplicates]

  def index
    @venues = Venue.filter_by_query(params[:q])
    @venues = authorize policy_scope(@venues)
    @venues = @venues.order_by(params[:order])

    respond_to do |format|
      format.html {
        require_authentication && return unless authenticated?
        render slim: @venues
      }
      format.json { render json: @venues.limit(5).to_json }
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

  def remove_duplicates
    duplicates = @venue.duplicates.reject { |v| v == @venue }
    # attach duplicate's events to @venue
    duplicates.each do |venue|
      # do not one-line this, or the events will still be associated to
      # duplicated venue
      events = venue.events
      events.each { |event| event.update!(venue: @venue) }
    end
    duplicates.each(&:destroy!)
    redirect_to unverified_path(section: "venues"), status: :see_other
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
