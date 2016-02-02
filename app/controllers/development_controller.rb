class DevelopmentController < ApplicationController
	def index
		# show message
		@allMessage = Message.all.order(created_at: :desc)
	end
	def showmessage
		if params[:idMessage].present?
			messageQuy = Message.find(params[:idMessage]);
			render json:{name: messageQuy.name, mail: messageQuy.mail, message: messageQuy.message, send_time: messageQuy.created_at, }
		end
	end
	def deletemessage
		if params[:idMessage].present?
			messageDelete = Message.find {params[:idMessage]}
			messageDelete.destroy
			render @allMessage
		end
	end
end
