Rails.application.routes.draw do

	# tell devise using custom controller
	devise_for :admins, :path => 'admin', :path_names => {:sign_in => 'login', :sign_out => 'logout'}
	resources :offices
	post 'offices/like'
	post 'offices/sendmail'
	post 'contact/message'
	post 'development/showmessage'
	post 'development/deletemessage'
	post 'dev_sendimage', to: 'contributed_image#send_image'
	post 'dev_show_user_image', to: 'development#show_user_image'
	get 'development/message', to: 'development#message'
	get 'development/contact', to: 'development#contact'
	get 'development/image', to: 'development#image'
	get 'development/count', to: 'development#view_count'
	get 'development', to: 'development#index'
	get 'contact', to: 'contact#index'
	get 'zorba', to: 'zorba#index'
	get 'send_image', to: 'contributed_image#index'
	get 'thank_you', to: 'contributed_image#thank_you'
	# error page
	get '/404', to: 'errors#not_found'
	get '/500', to: 'errors#internal_server_error'
	# The priority is based upon order of creation: first created -> highest priority.
	# See how all your routes lay out with "rake routes".

	# You can have the root of your site routed with "root"
	root 'offices#index'

	# Example of regular route:
	#   get 'products/:id' => 'catalog#view'

	# Example of named route that can be invoked with purchase_url(id: product.id)
	#   get 'products/:id/purchase' => 'catalog#purchase', as: :purchase

	# Example resource route (maps HTTP verbs to controller actions automatically):
	#   resources :products

	# Example resource route with options:
	#   resources :products do
	#     member do
	#       get 'short'
	#       post 'toggle'
	#     end
	#
	#     collection do
	#       get 'sold'
	#     end
	#   end

	# Example resource route with sub-resources:
	#   resources :products do
	#     resources :comments, :sales
	#     resource :seller
	#   end

	# Example resource route with more complex sub-resources:
	#   resources :products do
	#     resources :comments
	#     resources :sales do
	#       get 'recent', on: :collection
	#     end
	#   end

	# Example resource route with concerns:
	#   concern :toggleable do
	#     post 'toggle'
	#   end
	#   resources :posts, concerns: :toggleable
	#   resources :photos, concerns: :toggleable

	# Example resource route within a namespace:
	#   namespace :admin do
	#     # Directs /admin/products/* to Admin::ProductsController
	#     # (app/controllers/admin/products_controller.rb)
	#     resources :products
	#   end
end
