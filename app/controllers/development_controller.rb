class DevelopmentController < ApplicationController
	# index page
	def index
		
	end
	# all image page
	def image
		
	end
	# contact page
	def contact
		
	end
	# message page
	def message
		# show message
		@allMessage = Message.all.order(created_at: :desc)
	end
	def showmessage
		if params[:idMessage].present?
			messageQuy = Message.find(params[:idMessage]);
			# indexbcs = time_ago_in_words(messageQuy.created_at);
			render json:{name: messageQuy.name, mail: messageQuy.mail, message: messageQuy.message, send_time: messageQuy.created_at.in_time_zone(7).strftime("%B - %d - %Y  %H : %M"), }
		end
	end
	def deletemessage
		if params[:idMessage].present?
			messageDelete = Message.find {params[:idMessage]}
			messageDelete.destroy
		end
	end
end
