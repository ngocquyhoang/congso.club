# validate email
class EmailValidator < ActiveModel::EachValidator
  def validate_each(record, attribute, value)
    record.errors[attribute] << (options[:message] || "is not an email") unless
      value =~ /\A([^@\s]+)@((?:[-a-z0-9]+\.)+[a-z]{2,})\z/i
  end
end

class Message < ActiveRecord::Base
	validates :name, presence: true
	validates :mail, presence: true, email: true
	validates :message, presence: true
end
