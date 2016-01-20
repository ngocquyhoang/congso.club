class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception
  
  # def sendmail
  #   if params[:name].present? && params[:email].present?
  #     # save
  #     @newContact = Contact.new(params[:name], params[:email]);
  #     if @newContact.save
  #       @newContact.notice = "Save successfully !"
  #     else
  #       @newContact.notice = "Save false !"
  #     end
  #     # validate on model
  #   end
  # end
  
end
