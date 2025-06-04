class VenuesController < ApplicationController
  allow_unauthenticated_access except: %i[unverified verify destroy]
  before_action :set_venue, only: %i[show verify destroy]

  def index
    sql = <<~SQL
      name LIKE :string
      OR address LIKE :string
      OR city LIKE :string
    SQL
    @venues = Venue.where(sql, string: "%#{params[:q]}%").limit(5)
    render json: @venues.to_json
  end

  def unverified
    @venues = Venue.where(verified: false)
  end

  def show
    render json: @venue.to_json
  end

  def verify
    @venue.update(verified: true)
    render @venue
  end

  # def new
  # end

  # def create
  # end

  # def edit
  # end

  # def update
  # end

  def destroy
    @venue.destroy
  end

  private

  def set_venue
    @venue = Venue.find(params[:id])
  end
end
