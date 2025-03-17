class Event < ApplicationRecord
  belongs_to :venue

  validates :name, presence: true
  validates :date, presence: true

  class << self
    def all_upcoming = upcoming_events

    def verified_upcoming = upcoming_events.where(verified: true)

    def unverified_upcoming = upcoming_events.where(verified: false)

    private

    def upcoming_events = where("events.date >= ?", Date.today).order(:date)
  end
end
