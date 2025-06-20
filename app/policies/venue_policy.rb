class VenuePolicy < ApplicationPolicy
  def index?
    true
  end

  def show?
    @user.admin? || @record.verified?
  end

  def unverified? = @user.admin?

  def new? = index?

  def create? = new?

  def edit? = @user.admin?

  def update? = edit?

  def verify? = edit?

  def geocode? = edit?

  def destroy? = edit?

  class Scope < ApplicationPolicy::Scope
    def resolve
      @user.admin? ? scope.includes(:events).all : scope.where(verified: true)
    end
  end
end
