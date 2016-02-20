class DevelopmentController < ApplicationController
	before_filter :verify_is_admin
	# index page
	def index
		
	end
	# view count
	def view_count
		@home_page = ViewPage.first.home_page
		@zorba_page = ViewPage.first.zorba_page
		@contact_page = ViewPage.first.contact_page
		@contributed_image_page = ViewPage.first.contributed_image_page
		@allUserImage = UserImage.all.order(created_at: :desc)
		@allUserImage_paging = UserImage.paginate(:page => params[:page], :per_page => 25).order(created_at: :desc)
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
			render json:{name: messageQuy.name, mail: messageQuy.mail, message: messageQuy.message, send_time: messageQuy.created_at.in_time_zone(7).strftime("%B - %d - %Y  %H : %M"), }
		end
	end
	def deletemessage
		if params[:idMessage].present?
			messageDelete = Message.find {params[:idMessage]}
			messageDelete.destroy
		end
	end

	def show_user_image
		if params[:user_image_id].present?
			userImage = UserImage.find(params[:user_image_id])
			if params[:read].present?
				userImage.dev_readed = true
				userImage.save
			end
			render json:{name: userImage.name, email: userImage.email, title: userImage.title, noted: userImage.noted, image_upload: userImage.image_upload, image_link: userImage.image_link, image_idea: userImage.image_idea, send_time: userImage.created_at.in_time_zone(7).strftime("%B - %d - %Y  %H : %M")}
		end
	end

	private
	
		def facebook_shares(url)
			data = Net::HTTP.get(URI.parse("https://api.facebook.com/method/links.getStats?urls=#{URI.escape(url)}&format=json"))
			data = JSON.parse(data)
			data[0]
		end

		def verify_is_admin
			if admin_signed_in?
				# mus have role
			else
				redirect_to root_url
			end
		end
end
