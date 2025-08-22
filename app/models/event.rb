class Event < ApplicationRecord
  belongs_to :venue
  accepts_nested_attributes_for :venue

  before_validation :unverify_event_if_venue_is_unverified, if: [:venue, :verified?]

  validates :name, presence: true
  validates :date, presence: true
  validates :time, presence: true
  validates :datetime, presence: true

  def date = @date ||= datetime&.to_date

  def time = @time ||= datetime&.to_time

  def date=(val)
    @date = val
    (val && @time) ? update_datetime_date_and_time : errors.add(:date)
  end

  def time=(val)
    @time = val
    (val && @date) ? update_datetime_date_and_time : errors.add(:time)
  end

  def verified? = verified

  def unverified? = !verified

  def formatted_numeric_date = date.strftime("%d/%m/%y")

  def formatted_time = time.strftime("%Hh%M")

  def js_parsable_date = date.strftime("%d-%m-%Y")

  def js_parsable_time = time.strftime("%H:%M")

  private

  def unverify_event_if_venue_is_unverified
    self.verified = false unless venue.verified?
  end

  def update_datetime_date_and_time
    self.datetime = Time.local(@date.year, @date.month, @date.day, @time.hour, @time.min)
  end

  class << self
    def filter_unverified_with_params(params)
      return unverified_upcoming unless params.present?

      filtered = unverified_upcoming
      filtered = filtered.filter_by_dates(params) if params[:start]
      filtered = filtered.filter_by_position(params) if params[:radius]
      filtered = filtered.search(params[:q]) if params[:q]
      filtered
    end

    def filter_with_params(params)
      return self unless params.present?

      filtered = self
      filtered = filter_by_dates(params) if params[:start]
      filtered = filtered.filter_by_position(params) if params[:radius]
      filtered = filtered.search(params[:q]) if params[:q]
      filtered
    end

    def filter_by_dates(params)
      start_date = Date.strptime(params[:start], "%d-%m-%Y")
      end_date = params[:end].present? ? Date.strptime(params[:end], "%d-%m-%Y") : start_date
      between(start_date, end_date)
    end

    def between(start_date, end_date)
      where(datetime: start_date..end_date.tomorrow)
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

    def verified_upcoming = upcoming_events.where(verified: true, venues: {verified: true})

    def unverified_upcoming = upcoming_events.where(verified: false)

    private

    def upcoming_events
      includes(:venue).where("events.datetime >= ?", Date.today).order(:datetime)
    end
  end
end
