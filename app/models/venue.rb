class Venue < ApplicationRecord
  has_many :events, dependent: :destroy

  validates :name, presence: true
  validates :city, presence: true
  validates :address, presence: true
end
