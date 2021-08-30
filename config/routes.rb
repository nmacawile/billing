Rails.application.routes.draw do
  post 'users', to: 'users#create'
  post 'auth/login', to: 'authentication#authenticate'
  resources :templates do
    resources :departments
  end
  resources :items
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
