class Venue < ApplicationRecord
  has_many :events, dependent: :destroy

  validates :name, presence: true
  validates :address, presence: true
  validates :zipcode, presence: true
  validates :city, presence: true

  geocoded_by :full_address
  after_commit :geocode_later, on: :create
  before_save :normalize_fields_for_search, if: [:changed?]

  def geocode_later
    GeocodeVenueJob.perform_later(self)
  end

  def full_address
    "#{address}, #{zipcode} #{city}, France"
  end

  def verified? = verified

  def unverified? = !verified

  def possible_duplicates
    sql = <<~SQL
      name LIKE :name
      OR (address LIKE :address AND city LIKE :city)
    SQL
    data_dups = Venue.where(sql, name:, address:, city:)
    location_dups = geocoded? ? nearbys(0.01) : []
    (data_dups + location_dups).uniq
  end

  def possible_duplicate?
    possible_duplicates.count > 1
  end

  def in_department?
    return nil unless geocoded?

    code = "44"
    geographical_center = [47.3584, -1.7276] # Loire-Atlantique
    zipcode.start_with?(code) && distance_to(geographical_center) < 60
  end

  def normalize_fields_for_search
    search_fields = "#{name} #{address} #{city}"
    self.normalized_fields = I18n.transliterate(search_fields)
  end

  class << self
    def filter_by_query(query)
      sql = <<~SQL
        venues.name LIKE :string
        OR venues.address LIKE :string
        OR venues.city LIKE :string
      SQL
      Venue.where(sql, string: "%#{query}%")
    end

    def order_by(option)
      case option
      when "created_at" then order(:created_at)
      when "position" then order(:latitude, :longitude)
      else order("name")
      end
    end

    def all_verified
      @venues = Venue.where(verified: true)
    end

    def all_unverified
      @venues = Venue.where(verified: false).order(:created_at)
    end
  end
end
