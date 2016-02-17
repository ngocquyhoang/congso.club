class ContributedImageController < ApplicationController
	def index
		addView = ViewPage.first
		addView.contributed_image_page += 1
		addView.save
	end
end
