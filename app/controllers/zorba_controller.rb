class ZorbaController < ApplicationController
	def index
		addView = ViewPage.first
		addView.zorba_page += 1
		addView.save
	end
end
