require "faker"

puts "Seeding..."

if Rails.env.production?
  puts "#! Don't use these seeds in production environment !#"
  puts "To seed real venues, use rails db:venues_seed"
  puts "Exiting seeds..."
  exit
end

if Rails.env.development?
  test_admin = User.find_by(email_address: "admin@admin.com")
  User.create!(email_address: "admin@admin.com", password: "123456", role: "admin") unless test_admin
end

puts "Destroying all events..."
Event.destroy_all

unless Venue.any?
  puts "No venue found."
  puts "Please run 'rails db:venues_seed' and retry."
  exit
end

puts "Creating fake events..."

Faker::Config.locale = "fr"

tarifs = ["Gratuit", "Prix libre", "5€", "10€", "chapeau", nil]

100.times do
  attrs = {
    name: Faker::Music::RockBand.name,
    verified: rand > 0.5,
    datetime: DateTime.now + (24 * 365 * Math.exp(Math.log(rand) * 3)).hours,
    tarif: tarifs.sample
  }

  Event.create!(
    **attrs,
    venue: Venue.all.sample,
    description: Faker::Lorem.sentence(word_count: rand(3..10))
  )
end

puts "Created #{Event.count} events for #{Venue.count} venues."
