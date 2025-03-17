class EventPolicy < ApplicationPolicy
  def index?
    true
  end

  def unverified?
    @user.admin?
  end

  class Scope < ApplicationPolicy::Scope
    # NOTE: Be explicit about which records you allow access to!
    # def resolve
    #   scope.all
    # end
  end
end
