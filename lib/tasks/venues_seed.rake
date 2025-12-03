namespace :db do
  desc "seed venues from db/seeds/*.json"
  task venues_seed: :environment do
    load Rails.root.join("db", "venues_seed.rb")
  end
end
