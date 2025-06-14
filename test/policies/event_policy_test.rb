require 'test_helper'

class EventPolicyTest < ActiveSupport::TestCase
  def setup
    @admin = users(:admin)
    @user = User.new
    @event = events(:one)
    @unverified_event = events(:two)
    @past_event = events(:past_event)
  end

  test "admin can see all events in scope" do
    assert_includes EventPolicy::Scope.new(@admin, Event).resolve, @event
    assert_includes EventPolicy::Scope.new(@admin, Event).resolve, @unverified_event
  end

  test "regular users can only see verified events in scope" do
    assert_includes EventPolicy::Scope.new(@user, Event).resolve, @event
    assert_not_includes EventPolicy::Scope.new(@user, Event).resolve, @unverified_event
  end

  test "past events are not visible in scope" do
    assert_not_includes EventPolicy::Scope.new(@admin, Event).resolve, @past_event
    assert_not_includes EventPolicy::Scope.new(@user, Event).resolve, @past_event
  end

  test "admin can see all events" do
    assert EventPolicy.new(@admin, @event).show?
    assert EventPolicy.new(@admin, @unverified_event).show?
  end

  test "regular users can only see verified events" do
    assert EventPolicy.new(@user, @event).show?
    assert_not EventPolicy.new(@user, @unverified_event).show?
  end

  test "anyone can create an event" do
    assert EventPolicy.new(@admin, Event).create?
    assert EventPolicy.new(@user, Event).create?
  end

  test "only admin can update events" do
    assert EventPolicy.new(@admin, @event).update?
    assert_not EventPolicy.new(@user, @event).update?
  end

  test "only admin can delete events" do
    assert EventPolicy.new(@admin, @event).destroy?
    assert_not EventPolicy.new(@user, @event).destroy?
  end

  test "only admin can verify events" do
    assert EventPolicy.new(@admin, @event).verify?
    assert_not EventPolicy.new(@user, @event).verify?
  end

  test "anyone can access map and calendar" do
    assert EventPolicy.new(@admin, Event).map?
    assert EventPolicy.new(@user, Event).map?
    assert EventPolicy.new(@admin, Event).calendar?
    assert EventPolicy.new(@user, Event).calendar?
  end
end
