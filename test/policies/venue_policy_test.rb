require 'test_helper'

class VenuePolicyTest < ActiveSupport::TestCase
  def setup
    @admin = users(:admin)
    @user = User.new
    @venue = venues(:one)
    @unverified_venue = venues(:two)
  end

  test "admin can see all venues in scope" do
    assert_includes VenuePolicy::Scope.new(@admin, Venue).resolve, @venue
    assert_includes VenuePolicy::Scope.new(@admin, Venue).resolve, @unverified_venue
  end

  test "regular users can only see verified venues in scope" do
    assert_includes VenuePolicy::Scope.new(@user, Venue).resolve, @venue
    assert_not_includes VenuePolicy::Scope.new(@user, Venue).resolve, @unverified_venue
  end

  test "admin can see all venues" do
    assert VenuePolicy.new(@admin, @venue).show?
    assert VenuePolicy.new(@admin, @unverified_venue).show?
  end

  test "regular users can only see verified venues" do
    assert VenuePolicy.new(@user, @venue).show?
    assert_not VenuePolicy.new(@user, @unverified_venue).show?
  end

  test "anyone can create a venue" do
    assert VenuePolicy.new(@admin, Venue).create?
    assert VenuePolicy.new(@user, Venue).create?
  end

  test "only admin can update venues" do
    assert VenuePolicy.new(@admin, @venue).update?
    assert_not VenuePolicy.new(@user, @venue).update?
  end

  test "only admin can delete venues" do
    assert VenuePolicy.new(@admin, @venue).destroy?
    assert_not VenuePolicy.new(@user, @venue).destroy?
  end

  test "only admin can verify venues" do
    assert VenuePolicy.new(@admin, @venue).verify?
    assert_not VenuePolicy.new(@user, @venue).verify?
  end
end
