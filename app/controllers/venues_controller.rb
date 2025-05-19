class VenuesController < ApplicationController
  allow_unauthenticated_access
  def index
    sql = <<~SQL
      name LIKE :string
      OR address LIKE :string
      OR city LIKE :string
    SQL
    @venues = Venue.where(sql, string: "%#{params[:q]}%").limit(5)
    render json: @venues.to_json
  end

  def new
    @venue = params[:id] ? Venue.find(params[:id]) : Venue.new
  end

  def create
  end

  def edit
  end

  def update
  end

  def destroy
  end
end
