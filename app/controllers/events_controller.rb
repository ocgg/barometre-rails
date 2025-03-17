class EventsController < ApplicationController
  allow_unauthenticated_access except: :unverified

  def index
    @events = authorize Event.where(verified: true)
  end

  def unverified
    @events = authorize Event.where(verified: false)
  end

  def map
  end

  def calendar
  end

  def new
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
