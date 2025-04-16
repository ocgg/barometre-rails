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
end
