namespace :db do
  desc "seed venues from db/seeds/*.json"
  task venues_seeds: :environment do
    load Rails.root.join('db', 'venues_seeds.rb')
  end
end
