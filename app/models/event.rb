class Event < ApplicationRecord
  belongs_to :venue

  validates :name, presence: {message: "Le nom est obligatoire."}
  validates :date, presence: {message: "La date et l'heure sont obligatoires."}

  def verified? = verified

  def unverified? = !verified

  class << self
    def filter_with_params(params)
      return self unless params.present?
      filtered = self
      filtered = filter_by_dates(params) if params[:start]
      filtered = filtered.filter_by_position(params) if params[:radius]
      filtered = filtered.search(params[:q]) if params[:q]
      filtered
    end

    def filter_by_dates(params)
      start_date = Date.strptime(params[:start], "%m-%d-%Y")
      end_date = params[:end].present? ? Date.strptime(params[:end], "%m-%d-%Y") : start_date
      end_date += 1.day
      between(start_date, end_date)
    end

    def between(start_date, end_date)
      where(date: start_date..end_date)
    end

    def filter_by_position(params)
      venues = Venue.near([params[:lat], params[:long]], params[:radius], units: :km)
      where(venue: venues.to_a)
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
