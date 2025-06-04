class ApplicationController < ActionController::Base
  # Only allow modern browsers supporting webp images, web push, badges, import maps, CSS nesting, and CSS :has.
  allow_browser versions: :modern

  include Authentication
  include Pundit::Authorization
  rescue_from Pundit::NotAuthorizedError, with: :render_bad_request_error

  after_action :verify_pundit_authorization, unless: :authorized_controller?

  private

  def verify_pundit_authorization
    if %i[index map calendar].include? action_name
      verify_policy_scoped
    else
      verify_authorized
    end
  end

  def authorized_controller?
    authorized_controllers = %w[sessions pages]
    authorized_controllers.include? params[:controller]
  end

  def render_bad_request_error
    render file: "#{Rails.root}/public/400.html", layout: false, status: :unauthorized
  end

  def render_unprocessable_entity_error
    render file: "#{Rails.root}/public/422.html", layout: false, status: :unprocessable_entity
  end
end
