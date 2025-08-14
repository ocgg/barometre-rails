class ContactForm
  attr_accessor :email, :message

  include ActiveModel::Model

  validates :email, format: {with: URI::MailTo::EMAIL_REGEXP}
  validates :message, length: {minimum: 10}
end
