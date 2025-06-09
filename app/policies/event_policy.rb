class EventPolicy < ApplicationPolicy
  def index?
    true
  end

  def show?
    @user.admin? || @record.verified?
  end

  def unverified? = @user.admin?

  def map? = index?

  def calendar? = index?

  def new? = index?

  def create? = new?

  def edit? = @user.admin?

  def update? = edit?

  def verify? = edit?

  def destroy? = edit?

  class Scope < ApplicationPolicy::Scope
    def resolve
      @user.admin? ? scope.all_upcoming : scope.verified_upcoming
    end
  end
end
