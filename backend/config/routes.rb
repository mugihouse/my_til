Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      resources :home, only: [:index]

      mount_devise_token_auth_for 'User', at: 'auth', controllers: {
        registrations: 'auth/registrations'
      }
    end
  end
end
