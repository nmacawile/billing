Rails.application.routes.draw do
  post 'users', to: 'users#create'
  post 'auth/login', to: 'authentication#authenticate'
  resources :templates, except: [:new, :edit] do
    resources :departments, except: [:new, :edit] do
      resources :department_items, except: [:new, :edit]
    end
  end
  resources :items, except: [:new, :edit]
  resources :periodic_billings, except: [:new, :edit] do
    resources :periods, except: [:new, :edit] do
      resources :period_departments, except: [:new, :edit]
    end
  end
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
