class ContributedImageController < ApplicationController
	def index
		addView = ViewPage.first
		addView.contributed_image_page += 1
		addView.save
	end
	def send_image
		puts "DMKMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM"
		
		render json:{redirect_page: thank_you_path}
	end
	def thank_you
		
	end
end
