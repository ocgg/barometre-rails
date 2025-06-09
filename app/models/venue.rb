class Venue < ApplicationRecord
  has_many :events, dependent: :destroy

  validates :name, presence: true
  validates :city, presence: true
  validates :address, presence: true

  geocoded_by :full_address
  after_validation :geocode, if: ->(venue) { venue.address_changed? }

  def full_address
    "#{address}, #{city}, Loire-Atlantique, France"
  end

  def verified? = verified

  def unverified? = !verified

  def duplicates
    sql = <<~SQL
      name LIKE :name
      AND address LIKE :address
      AND city LIKE :city
    SQL
    Venue.where(sql, name:, address:, city:)
  end

  def duplicate?
    duplicates.count > 1
  end

  def in_loire_atlantique?
    center = [47.3584, -1.7276]
    Geocoder::Calculations.distance_between(center, self) < 60
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

    def all_unverified
      @venues = Venue.where(verified: false).order(:created_at)
    end
  end
end
