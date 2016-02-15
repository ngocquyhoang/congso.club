class OfficesController < ApplicationController
	before_action :set_office, only: [:show, :edit, :update, :destroy]
	# GET /offices
	# GET /offices.json
	def index
		@productDomain = "congso.club"
		@offices = Office.all.order(created_at: :desc)
		@offices = Office.paginate(:page => params[:page], :per_page => 5).order(created_at: :desc)
	end

	# GET /offices/1
	# GET /offices/1.json
	def show
		productDomain = "congso.club"
		@currentUrl = productDomain + "/offices/" + @office.slug
		# add to database
		post = Office.find(@office.id)
		post.view += 1
		post.save
	end
	# like button
	def like
		if params[:idPost].present?
			likeCount = Office.find(params[:idPost])
			likeCount.like = likeCount.like + 1
			likeCount.save
		end
	end
  
	def sendmail
		@newContact = Contact.new( name: params[:name], email: params[:email])
		# ERROR
		clearDataField = []
		# save form
		if @newContact.save
			render json:{notice: "Success !"}
		else
			# short messages
			errorMessage = []
			focusElement = ""
			# push name error message
			if @newContact.errors["name"][0].present?
				errorMessage.push('Tên của bạn không nên bỏ trống');
				focusElement = "name"
				clearDataField.push("name")
			end
			# push email error
			if @newContact.errors["email"][0].present?
				if @newContact.errors["email"][0] == "can't be blank"
					errorMessage.push('Email của bạn không nên bỏ trống');
				else
					errorMessage.push('Email bạn nhập không đúng định dạng');
				end
				# focusElement
				if focusElement == ""
					focusElement = "email"
				else
					focusElement = "name"
				end
				clearDataField.push("email")
			end
			render json:{errorMessage: errorMessage, focusElement: focusElement, clearDataField: clearDataField}
		end
	end
  
	# GET /offices/new
	def new
		if admin_signed_in?
			# must have role
			@office = Office.new
		else
			redirect_to root_url
		end
	end

	# GET /offices/1/edit
	def edit
		if admin_signed_in?

		else
			redirect_to root_url
		end
	end

	# POST /offices
	# POST /offices.json
	def create
		if admin_signed_in?
			# add params if don't have owner
			if office_params[:title].present? && office_params[:image].present?
				imageParams = office_params
				if imageParams[:owner] == ""
					imageParams[:owner] = "Admin congso.club"
				end
				@office = Office.new(imageParams)
				respond_to do |format|
					if @office.save
						format.html { redirect_to @office, notice: 'Office was successfully created.' }
						format.json { render :show, status: :created, location: @office }
					else
						format.html { render :new }
						format.json { render json: @office.errors, status: :unprocessable_entity }
					end
				end
			end
		else
			redirect_to root_url
		end
	end

  # PATCH/PUT /offices/1
  # PATCH/PUT /offices/1.json
	def update
		if admin_signed_in?
			respond_to do |format|
				if @office.update(office_params)
					format.html { redirect_to @office, notice: 'Office was successfully updated.' }
					format.json { render :show, status: :ok, location: @office }
				else
					format.html { render :edit }
					format.json { render json: @office.errors, status: :unprocessable_entity }
				end
			end
		else
			redirect_to root_url
		end
	end

	# DELETE /offices/1
	# DELETE /offices/1.json
	def destroy
		if admin_signed_in?
			@office.destroy
			respond_to do |format|
				format.html { redirect_to offices_url, notice: 'Office was successfully destroyed.' }
				format.json { head :no_content }
			end
		else
			redirect_to root_url
		end
	end

	private
		# Use callbacks to share common setup or constraints between actions.
		def set_office
			@office = Office.friendly.find(params[:id])
		end

		# Never trust parameters from the scary internet, only allow the white list through.
		def office_params
			params.require(:office).permit(:title, :owner, :image)
		end

		def facebook_shares(url)
			data = Net::HTTP.get(URI.parse("https://api.facebook.com/method/links.getStats?urls=#{URI.escape(url)}&format=json"))
			data = JSON.parse(data)
			data[0]
		end
end
