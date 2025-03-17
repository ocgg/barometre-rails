class Event < ApplicationRecord
  belongs_to :venue

  class << self
    def verified_upcoming
      upcoming_events.where(verified: true)
    end

    def all_upcoming
      upcoming_events
    end

    def unverified_upcoming
      upcoming_events.where(verified: false)
    end

    private

    def upcoming_events
      where("events.date >= ?", Date.today).order(:date)
    end
  end
end
