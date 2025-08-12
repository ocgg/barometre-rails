class PagesController < ApplicationController
  allow_unauthenticated_access

  def about
  end

  def contact
  end

  def contact_form_submit
    contact_params = contact_form_params

    email = contact_params[:email]
    message = contact_params[:message]
    attachment = contact_params[:attachment]

    # TODO: manage attachment
    # TODO: Send email
    # TODO: notify user
  end

  private

  def contact_form_params
    params.require(:contact_form).permit(:email, :message, :attachment)
  end
end
