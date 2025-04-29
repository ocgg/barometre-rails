require "faker"

puts "Destroying all events..."

Event.destroy_all

test_admin = User.find_by(email_address: "admin@admin.com")
User.create!(email_address: "admin@admin.com", password: "123456", role: "admin") unless test_admin

puts "Creating venues..."
venues_count = 0
[
  {
    name: "Café de la Loire",
    address: "4 quai Boulay Paty",
    city: "Paimboeuf"
  },
  {
    name: "Café du cinema",
    address: "8 Rue des Carmélites",
    city: "Nantes"
  },
  {
    name: "Le Chat Noir",
    address: "13 Allée Duguay-Trouin",
    city: "Nantes"
  },
  {
    name: "Delirium cafe",
    address: "19 allée Baco",
    city: "Nantes"
  },
  {
    name: "Live Bar",
    address: "6, rue de Strasbourg",
    city: "Nantes"
  },
  {
    name: "Le Melting Potes",
    address: "26 Bd de la Prairie au Duc",
    city: "Nantes"
  },
  {
    name: "Le Ferrailleur",
    address: "21 quai des antilles",
    city: "Nantes"
  },
  {
    name: "Le Petit Café de Rezé",
    address: "7 rue Maurice Lagathu",
    city: "Rezé"
  },
  {
    name: "Café de l'Océan",
    address: "2 Quai Saint Pierre",
    city: "La Turballe"
  }
].each do |attrs|
  next if Venue.exists?(attrs)

  Venue.create!(attrs)
  venues_count += 1
end

puts "Creating events..."

Faker::Config.locale = "fr"

tarifs = ["Gratuit", "Prix libre", "5€", "10€", "chapeau", nil]

100.times do
  attrs = {
    name: Faker::Music::RockBand.name,
    verified: rand > 0.5,
    date: Time.now + (24 * 365 * Math.exp(Math.log(rand) * 3)).hours,
    tarif: tarifs.sample
  }

  Event.create!(
    **attrs,
    venue: Venue.all.sample,
    description: Faker::Lorem.sentence(word_count: rand(3..10))
  )
end

puts "Created #{venues_count} new venues & #{Event.count} events."
