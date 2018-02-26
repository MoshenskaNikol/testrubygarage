Rails.application.routes.draw do
  devise_for :users, sign_out_via: [:get]

  root to: 'index#index'

  post '/tasks/priority_up/:id', to: 'tasks#priority_up'
  post '/tasks/priority_down/:id', to: 'tasks#priority_down'

  resources :tasks, :projects, only: [:create, :update, :destroy]
end
