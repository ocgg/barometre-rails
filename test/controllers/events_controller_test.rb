require "test_helper"

class EventsControllerTest < ActionDispatch::IntegrationTest
  test "should get events index on root path" do
    get root_url
    assert_response :success
  end

  test "unverified should not be authorized" do
    get unverified_url
    assert_response :unauthorized
  end

  test "should get map" do
    get map_url
    assert_response :success
  end

  test "should get calendar" do
    get calendar_url
    assert_response :success
  end

  # test "should get new" do
  #   get new_events_url
  #   assert_response :success
  # end
  #
  # test "should get create" do
  #   get create_events_url
  #   assert_response :success
  # end
  #
  # test "should get edit" do
  #   get edit_events_url
  #   assert_response :success
  # end
  #
  # test "should get update" do
  #   get update_events_url
  #   assert_response :success
  # end
  #
  # test "should get destroy" do
  #   get destroy_events_url
  #   assert_response :success
  # end
end
