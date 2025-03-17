puts "Destroy all records..."

Venue.destroy_all
# Event.destroy_all # not needed (dependent destroy on Venue)

test_admin = User.find_by(email_address: "admin@admin.com")
test_user = User.find_by(email_address: "user@user.com")
User.create!(email_address: "admin@admin.com", password: "123456", role: "admin") unless test_admin
User.create!(email_address: "user@user.com", password: "123456", role: "user") unless test_user

puts "Creating venues..."

[
  {
    name: "Adresse dure pour GPS",
    city: "Nantes",
    address: "10 passage de la poule noire"
  },
  {
    name: "Babar la Poupoule au très très long nom à rallonge pour en tester l'affichage",
    city: "Nantes",
    address: "32 rue Georges Laffont"
  },
  {
    name: "Fausse adresse",
    city: "Mouchny",
    address: "342 rue du foutrequeue à clous"
  },
  {
    name: "Les Cordeliers",
    city: "Clisson",
    address: "5 rue de la Vallée"
  },
  {
    name: "Maison du Bonheur",
    city: "Saint-Fiacre-sur-Maine",
    address: "11 rue Saint-Vincent"
  },
  {
    name: "Doublon du Bonheur",
    city: "Saint-Fiacre-sur-Maine",
    address: "11 rue Saint-Vincent"
  },
  {
    name: "Approximation du Bonheur",
    city: "st fiacre",
    address: "11 st vincent"
  },
  {
    name: "Autre Version du Bonheur",
    city: "st fiacre sur maine",
    address: "11 rue st vincent"
  }
].each do |attrs|
  Venue.create!(attrs)
end

puts "Creating events..."

[
  { name: "Dans 2h !!", verified: true, date: Time.now + 2.hours },
  { name: "X Ce soir aussi", verified: false, date: Time.now + 5.hours },
  { name: "Quelque chose demain", verified: true, date: Time.now + 1.day },
  { name: "X Demain", verified: false, date: Time.now + 1.day },
  { name: "Ça se passe la semaine prochaine", verified: true, date: Time.now + 1.week },
  { name: "X Semaine prochaine", verified: false, date: Time.now + 8.days },
  { name: "Un événement dans un mois", verified: true, date: Time.now + 1.month },
  { name: "Dans 3 mois bon sang de bonsoir de brique en bois", verified: true, date: Time.now + 3.months },
  { name: "Ça c'était hier", verified: true, date: Time.now - 1.day }
].each do |attrs|
  Event.create!(
    **attrs,
    venue: Venue.first(5).sample,
    style: %w[rock Electro-transe-tribale\ avec\ des\ noix théâtre rock\ folk\ chanson jam\ session\ irlandaise].sample,
    description: "TODO: description de longueur aléatoire"
  )
end

puts "Created #{Venue.count} venues & #{Event.count} events."
