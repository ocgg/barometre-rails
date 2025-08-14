class ContactMailer < ApplicationMailer
  default to: Rails.application.credentials.dig(:barometre, :contact_recipient)

  def contact_email
    @email = params[:email]
    @message = params[:message]
    mail(subject: "[Baromètre] Nouveau message")
  end
end
