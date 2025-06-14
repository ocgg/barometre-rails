require "test_helper"

class AdminPagesControllerTest < ActionDispatch::IntegrationTest
  setup do
    @admin = users(:admin)
    @visitor = User.new(role: "visitor")
  end

  test "visitor should not access unverified page" do
    get unverified_url
    assert_redirected_to new_session_url
  end

  test "visitor should not access unverified page with events section" do
    get unverified_url(section: "events")
    assert_redirected_to new_session_url
  end

  test "visitor should not access unverified page with venues section" do
    get unverified_url(section: "venues")
    assert_redirected_to new_session_url
  end

  test "admin should access unverified page" do
    sign_in_as_admin
    get unverified_url
    assert_response :success
    assert_select "a[href=?]", unverified_events_path
  end

  test "admin should access unverified page with events section" do
    sign_in_as_admin
    get unverified_url(section: "events")
    assert_response :success
    assert_select "a[href=?]", unverified_events_path
  end

  test "admin should access unverified page with venues section" do
    sign_in_as_admin
    get unverified_url(section: "venues")
    assert_response :success
    assert_select "a[href=?]", unverified_venues_path
  end

  private

  def sign_in_as_admin
    post session_url, params: { email_address: @admin.email_address, password: "password" }
  end
end
