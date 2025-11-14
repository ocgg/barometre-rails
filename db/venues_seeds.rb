puts "Seeding venues..."
puts "Getting data from JSON files in db/seeds/..."

# Côtes d'Armor
venues_22 = JSON.parse(File.read("db/seeds/venues_22.json"), symbolize_names: true)
# Finistère
venues_29 = JSON.parse(File.read("db/seeds/venues_29.json"), symbolize_names: true)
# Ille-et-Vilaine
venues_35 = JSON.parse(File.read("db/seeds/venues_35.json"), symbolize_names: true)
# Morbihan
venues_56 = JSON.parse(File.read("db/seeds/venues_56.json"), symbolize_names: true)
# Loire-Atlantique
venues_44 = JSON.parse(File.read("db/seeds/venues_44.json"), symbolize_names: true)

puts "Creating venues..."

count = 0

[
  *venues_22,
  *venues_29,
  *venues_35,
  *venues_44,
  *venues_56
].each do |attrs|
  next if Venue.exists?(attrs)

  Venue.create!(**attrs, verified: true)
  count += 1
end

puts "Done!"
puts "#{count} venues created - #{Venue.count - count} untouched."
