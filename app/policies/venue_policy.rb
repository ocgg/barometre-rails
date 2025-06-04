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
      @user.admin? ? scope.all : scope.where(verified: true)
    end
  end
end
