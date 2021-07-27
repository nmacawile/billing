Rails.application.routes.draw do
  post 'users', to: 'users#create'
  post 'auth/login', to: 'authentication#authenticate'
  resources :templates
  resources :clients
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
