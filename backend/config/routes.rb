Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do

      mount_devise_token_auth_for 'User', at: 'auth', controllers: {
        registrations: 'auth/registrations'
      }

      get '/authenticate', to: 'authentications#authenticate'

      get '/articles/month_data/:date', to: 'articles#month_data'
      resources :articles do
        member do
          get 'edit'
        end
      end

    end
  end
end
