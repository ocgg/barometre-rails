require "test_helper"

class Api::VenuesControllerTest < ActionDispatch::IntegrationTest
  setup do
    @venue = venues(:one)
  end

  test "should get index without authentication" do
    get api_venues_url
    assert_response :success
    json_response = JSON.parse(response.body)
    assert_not_empty json_response
  end

  test "should get show without authentication" do
    get api_venue_url(@venue)
    assert_response :success
    json_response = JSON.parse(response.body)
    assert_equal @venue.id, json_response["id"]
    assert_equal @venue.name, json_response["name"]
    assert_equal @venue.address, json_response["address"]
    assert_equal @venue.city, json_response["city"]
    assert_equal @venue.latitude.to_f, json_response["latitude"]
    assert_equal @venue.longitude.to_f, json_response["longitude"]
  end

  test "should not get show for non-existent venue" do
    get api_venue_url(id: Venue.last.id + 1)
    assert_response :not_found
  end

  test "should not get verified, created_at & updated_at" do
    get api_venue_url(@venue)
    assert_response :success
    json_response = JSON.parse(response.body)
    assert_not_includes json_response.keys, "verified"
    assert_not_includes json_response.keys, "created_at"
    assert_not_includes json_response.keys, "updated_at"
  end

  test "should filter venues by keyword" do
    get api_venues_url, params: { q: @venue.name }
    assert_response :success
    json_response = JSON.parse(response.body)
    assert_not_empty json_response
    json_response.each do |venue|
      assert_includes venue["name"], @venue.name
    end
  end

  test "should limit results" do
    get api_venues_url, params: { limit: 1 }
    assert_response :success
    json_response = JSON.parse(response.body)
    assert_equal 1, json_response.length
  end

  test "should order results" do
    get api_venues_url, params: { order: "name" }
    assert_response :success
    json_response = JSON.parse(response.body)
    assert_not_empty json_response
    venues = json_response.map { |v| v["name"] }
    assert_equal venues.sort, venues
  end

  test "should combine filters" do
    get api_venues_url, params: {
      q: @venue.name,
      limit: 5,
      order: "name"
    }
    assert_response :success
    json_response = JSON.parse(response.body)
    assert_not_empty json_response
    assert_operator json_response.length, :<=, 5
    venues = json_response.map { |v| v["name"] }
    assert_equal venues.sort, venues
    json_response.each do |venue|
      assert_includes venue["name"], @venue.name
    end
  end
end
