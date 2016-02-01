class DevelopmentController < ApplicationController
	def index
		# show message
		@allMessage = Message.all.order(created_at: :desc)
	end
	def read_message
		
	end
end
