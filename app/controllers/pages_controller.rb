class PagesController < ApplicationController
  allow_unauthenticated_access

  def about
  end

  def contact
    @contact_form = ContactForm.new
  end

  def contact_form_submit
    @contact_form = ContactForm.new(contact_form_params)

    if @contact_form.valid?
      form_data = {email: @contact_form.email, message: @contact_form.message}
      ContactMailer.with(form_data).contact_email.deliver_later
      redirect_to :contact, notice: "Message bien envoyé !"
    else
      render :contact, status: :unprocessable_entity
    end
  end

  private

  def contact_form_params
    params.require(:contact_form).permit(:email, :message)
  end
end
