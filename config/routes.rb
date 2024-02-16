Rails.application.routes.draw do
  root "home#index"

  get '/yearly_data/:year', to: 'companies#yearly_data'
end
