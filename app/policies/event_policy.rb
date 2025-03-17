class EventPolicy < ApplicationPolicy
  def index?
    true
  end

  def unverified? = @user.admin?

  def map? = index?

  def calendar? = index?

  class Scope < ApplicationPolicy::Scope
    def resolve
      @user.admin? ? scope.all_upcoming : scope.verified_upcoming
    end
  end
end
