class Event < ApplicationRecord
  belongs_to :venue

  validates :name, presence: true
  validates :date, presence: true

  def verified? = verified

  def unverified? = !verified

  class << self
    def between(start_date, end_date)
      where(date: start_date..end_date)
    end

    def search(string)
      sql_subquery = <<~SQL
        events.name LIKE :string
        OR events.tarif LIKE :string
        OR events.description LIKE :string
        OR venues.name LIKE :string
        OR venues.address LIKE :string
        OR venues.city LIKE :string
      SQL
      upcoming_events.joins(:venue).where(sql_subquery, string: "%#{string}%")
    end

    def all_upcoming = upcoming_events

    def verified_upcoming = upcoming_events.where(verified: true)

    def unverified_upcoming = upcoming_events.where(verified: false)

    private

    def upcoming_events
      includes(:venue).where("events.date >= ?", Date.today).order(:date)
    end
  end
end
