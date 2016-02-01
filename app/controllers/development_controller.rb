class DevelopmentController < ApplicationController
	def index
		# show message
		@allMessage = Message.all
	end
end
