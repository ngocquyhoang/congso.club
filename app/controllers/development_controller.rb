class DevelopmentController < ApplicationController
	# index page
	def index
		
	end
	# all image page
	def image
		@allImage = Office.all.order(created_at: :desc)
		@allImage_paging = Office.paginate(:page => params[:page], :per_page => 25).order(created_at: :desc)
	end
	# contact page
	def contact
		@allContact = Contact.all.order(created_at: :desc)
		@allContact_paging = Contact.paginate(:page => params[:page], :per_page => 25).order(created_at: :desc)
	end
	# message page
	def message
		# show message
		@allMessage = Message.all.order(created_at: :desc)
		@allMessage_paging = Message.paginate(:page => params[:page], :per_page => 25).order(created_at: :desc)
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

	private
	
		def facebook_shares(url)
			data = Net::HTTP.get(URI.parse("https://api.facebook.com/method/links.getStats?urls=#{URI.escape(url)}&format=json"))
			data = JSON.parse(data)
			data[0]
		end
end
