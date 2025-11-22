require "faker"

puts "Seeding..."

if Rails.env.production?
  puts "#! Don't use these seeds in production environment !#"
  puts "To seed real venues, use rails db:venues_seeds"
  puts "Exiting seeds..."
  exit
end

puts "Destroying all events & venues..."

Event.destroy_all

if Rails.env.development?
  test_admin = User.find_by(email_address: "admin@admin.com")
  User.create!(email_address: "admin@admin.com", password: "123456", role: "admin") unless test_admin
end

puts "Creating venues..."
venues_count = 0
venue_attrs = [
  {
    name: "Café de la Loire",
    address: "4 quai Boulay Paty",
    city: "Paimboeuf",
    zipcode: "44560"
  },
  {
    name: "Café du Cinéma",
    address: "8 Rue des Carmélites",
    city: "Nantes",
    zipcode: "44000"
  },
  {
    name: "Le Chat Noir",
    address: "13 Allée Duguay-Trouin",
    city: "Nantes",
    zipcode: "44000"
  },
  {
    name: "Delirium cafe",
    address: "19 allée Baco",
    city: "Nantes",
    zipcode: "44000"
  },
  {
    name: "Live Bar",
    address: "6, rue de Strasbourg",
    city: "Nantes",
    zipcode: "44000"
  },
  {
    name: "Le Melting Potes",
    address: "26 Bd de la Prairie au Duc",
    city: "Nantes",
    zipcode: "44200"
  },
  {
    name: "Le Ferrailleur",
    address: "21 quai des antilles",
    city: "Nantes",
    zipcode: "44200"
  },
  {
    name: "Le Petit Café de Rezé",
    address: "7 rue Maurice Lagathu",
    city: "Rezé",
    zipcode: "44400"
  },
  {
    name: "Cap 270",
    address: "1 Quai Saint Pierre",
    city: "La Turballe",
    zipcode: "44420"
  }
]

# Destroy all venues other than these above
allowed_keys = venue_attrs.map { |v| [v[:name], v[:address], v[:city], v[:zipcode]] }
Venue.find_each do |venue|
  unless allowed_keys.include?([venue.name, venue.address, venue.city, venue.zipcode])
    venue.destroy!
  end
end

venue_attrs.each do |attrs|
  next if Venue.exists?(attrs)

  Venue.create!(**attrs, verified: true)
  venues_count += 1
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

puts "Created #{venues_count} new venues & #{Event.count} events."
