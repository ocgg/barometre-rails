Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Reveal health status on /up that returns 200 if the app boots with no exceptions, otherwise 500.
  # Can be used by load balancers and uptime monitors to verify that the app is live.
  get "up" => "rails/health#show", :as => :rails_health_check

  # Render dynamic PWA files from app/views/pwa/* (remember to link manifest in application.html.erb)
  # get "manifest" => "rails/pwa#manifest", as: :pwa_manifest
  # get "service-worker" => "rails/pwa#service_worker", as: :pwa_service_worker

  resource :session
  resources :passwords, param: :token, only: %i[new create]

  # Defines the root path route ("/")
  root "events#index"

  resources :venues, only: %i[index show edit update destroy] do
    get :unverified, on: :collection
    patch :verify, on: :member
    patch :remove_duplicates, on: :member
  end

  resources :events do
    get :unverified, on: :collection
    patch :verify, on: :member
  end

  get :team, to: "sessions#new"
  get :unverified, to: "admin_pages#unverified"

  get :map, to: "events#map"
  get :calendar, to: "events#calendar"

  get :contact, to: "pages#contact"
  get :apropos, to: "pages#about", as: :about
end
