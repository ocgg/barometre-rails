class VenuesController < ApplicationController
  allow_unauthenticated_access except: %i[unverified verify destroy]

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
    @venue = Venue.find(params[:id])
    render json: @venue.to_json
  end

  def verify
    @venue = authorize Venue.find(params[:id])
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
  end
end
