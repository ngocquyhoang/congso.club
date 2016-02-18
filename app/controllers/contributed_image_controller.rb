class ContributedImageController < ApplicationController
	def index
		addView = ViewPage.first
		addView.contributed_image_page += 1
		addView.save
	end
	def send_image
		if params[:email].present? && params[:title].present? && params[:image_input_type].present?
			newUserImage = UserImage.new
			newUserImage.name = params[:name]
			newUserImage.email = params[:email]
			newUserImage.title = params[:title]
			newUserImage.noted = params[:noted]
			case params[:image_input_type]
			when "upload-image"
				newUserImage.image_upload = params[:image]
				byebug
				zorba = true
			when "add-link"
				newUserImage.image_link = params[:image]
				zorba = true
			when "add-idea"
				newUserImage.image_idea = params[:image]
				zorba = true
			else
				zorba = false
			end
			if zorba
				newUserImage.save
			end
		end
		render json:{redirect_page: thank_you_path}
	end
	def thank_you
		
	end
end
