class VenuePolicy < ApplicationPolicy
  def index?
    true
  end

  def unverified? = @user.admin?

  def new? = index?

  def create? = new?

  def edit? = @user.admin?

  def verify? = edit?

  def destroy? = edit?

  class Scope < ApplicationPolicy::Scope
    def resolve
      @user.admin? ? scope.all_upcoming : scope.verified_upcoming
    end
  end
end
