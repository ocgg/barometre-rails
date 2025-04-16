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

[
  {
    name: "Dans 2h !!",
    verified: true,
    date: Time.now + 2.hours,
    tarif: "Gratuit"
  },
  {
    name: "X Ce soir aussi",
    verified: false,
    date: Time.now + 5.hours,
    tarif: "-"

  },
  {
    name: "Quelque chose demain",
    verified: true,
    date: Time.now + 1.day,
    tarif: "PAF 5€"
  },
  {
    name: "X Demain",
    verified: false,
    date: Time.now + 1.day,
    tarif: "10€"
  },
  {
    name: "Ça se passe la semaine prochaine",
    verified: true,
    date: Time.now + 1.week,
    tarif: "Prix libre"
  },
  {
    name: "X Semaine prochaine",
    verified: false,
    date: Time.now + 8.days,
    tarif: "Prix"
  },
  {
    name: "Un événement dans un mois",
    verified: true,
    date: Time.now + 1.month,
    tarif: "Prix"
  },
  {
    name: "Dans 3 mois bon sang de bonsoir de brique en bois",
    verified: true,
    date: Time.now + 3.months,
    tarif: "Prix"
  },
  {
    name: "Ça c'était hier",
    verified: true,
    date: Time.now - 1.day,
    tarif: "Prix"
  }
].each do |attrs|
  Event.create!(
    **attrs,
    venue: Venue.first(5).sample,
    description: "TODO: description de longueur aléatoire"
  )
end

puts "Created #{venues_count} new venues & #{Event.count} events."
