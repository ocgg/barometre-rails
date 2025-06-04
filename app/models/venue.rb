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

  class << self
    def filter_by_query(query)
    sql = <<~SQL
      name LIKE :string
      OR address LIKE :string
      OR city LIKE :string
    SQL
    @venues = Venue.where(verified: true)
      .where(sql, string: "%#{query}%")
      .limit(5)
    end
  end
end
