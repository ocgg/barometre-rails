require "test_helper"

class VenuesControllerTest < ActionDispatch::IntegrationTest
  setup do
    @admin = users(:admin)
    @venue = venues(:one)
    @unverified_venue = venues(:two)
  end

  test "visitor should get venues index as json" do
    get venues_url, as: :json
    assert_response :success
    assert_equal "application/json", @response.media_type
  end

  test "visitor should not get venues index as html" do
    get venues_url
    assert_redirected_to new_session_url
  end

  test "visitor should get venue show as json" do
    get venue_url(@venue), as: :json
    assert_response :success
    assert_equal "application/json", @response.media_type
  end

  test "visitor should get venue show as turbo frame" do
    get venue_url(@venue), headers: { "Turbo-Frame" => "content" }
    assert_response :success
    assert_select "turbo-frame##{dom_id(@venue)}"
  end

  test "visitor should not access unverified venues" do
    get unverified_venues_url
    assert_redirected_to new_session_url
  end

  test "visitor should not edit venue" do
    get edit_venue_url(@venue)
    assert_redirected_to new_session_url
  end

  test "visitor should not update venue" do
    patch venue_url(@venue), params: { venue: { name: "Nouveau nom" } }
    assert_redirected_to new_session_url
  end

  test "visitor should not verify venue" do
    patch verify_venue_url(@venue)
    assert_redirected_to new_session_url
  end

  test "visitor should not destroy venue" do
    assert_no_difference("Venue.count") do
      delete venue_url(@venue)
    end
    assert_redirected_to new_session_url
  end

  test "admin should access unverified venues" do
    sign_in_as_admin
    get unverified_venues_url
    assert_response :success
  end

  test "admin should edit venue" do
    sign_in_as_admin
    get edit_venue_url(@venue)
    assert_response :success
  end

  test "admin should update venue" do
    sign_in_as_admin
    patch venue_url(@venue), params: { venue: { name: "Nouveau nom" } }
    assert_redirected_to venue_url(@venue)
    @venue.reload
    assert_equal "Nouveau nom", @venue.name
  end

  test "admin should not update venue with invalid data" do
    sign_in_as_admin
    patch venue_url(@venue), params: { venue: { name: "" } }
    assert_response :unprocessable_entity
  end

  test "admin should verify venue" do
    sign_in_as_admin
    patch verify_venue_url(@unverified_venue)
    assert_response :success
    @unverified_venue.reload
    assert @unverified_venue.verified?
  end

  test "admin should destroy venue" do
    sign_in_as_admin
    assert_difference("Venue.count", -1) do
      delete venue_url(@venue), as: :turbo_stream
    end
    assert_response :success
  end

  test "admin should get venues index as html" do
    sign_in_as_admin
    get venues_url
    assert_response :success
    assert_select "turbo-frame#content"
  end

  private

  def sign_in_as_admin
    post session_url, params: { email_address: @admin.email_address, password: "password" }
  end
end
