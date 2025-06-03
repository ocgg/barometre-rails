require "test_helper"

class AdminPagesControllerTest < ActionDispatch::IntegrationTest
  test "should get unverified" do
    get admin_pages_unverified_url
    assert_response :success
  end
end
