class ContactController < ApplicationController
  def index
  end
  # save message
  def message
  	if params[:name].present? && params[:email].present? && params[:message].present?
  		newMessage = Message.new( name: params[:name], mail: params[:email], message: params[:message])
  		if newMessage.save
	      render json:{notice: "success"}
	    else
  			render json:{notice: "error"}
  		end
  	else
  		render json:{notice: "error"}
  	end
  end
end
