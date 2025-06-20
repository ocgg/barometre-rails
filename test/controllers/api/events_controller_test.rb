require "test_helper"

class Api::EventsControllerTest < ActionDispatch::IntegrationTest
  setup do
    @event = events(:one)
    @venue = venues(:one)
  end

  test "should get index without authentication" do
    get api_events_url
    assert_response :success
    json_response = JSON.parse(response.body)
    assert_not_empty json_response
  end

  test "should get show without authentication" do
    get api_event_url(@event)
    assert_response :success
    json_response = JSON.parse(response.body)
    assert_equal @event.id, json_response["id"]
    assert_equal @event.name, json_response["name"]
    assert_equal @event.description, json_response["description"]
    assert_equal @event.tarif, json_response["tarif"]
    assert_equal @event.datetime, json_response["datetime"]
  end

  test "should not get show for non-existent event" do
    get api_event_url(id: Event.last.id + 1)
    assert_response :not_found
  end

  test "should get index with venue details" do
    get api_events_url
    assert_response :success
    json_response = JSON.parse(response.body)
    assert_not_empty json_response
    first_event = json_response.first
    assert_includes first_event.keys, "venue"
    venue = first_event["venue"]
    assert_equal @venue.id, venue["id"]
    assert_equal @venue.name, venue["name"]
    assert_equal @venue.address, venue["address"]
    assert_equal @venue.city, venue["city"]
    assert_equal @venue.latitude.to_f, venue["latitude"]
    assert_equal @venue.longitude.to_f, venue["longitude"]
  end

  test "should not get verified, created_at & updated_at" do
    get api_event_url(@event)
    assert_response :success
    json_response = JSON.parse(response.body)
    assert_not_includes json_response.keys, "verified"
    assert_not_includes json_response.keys, "created_at"
    assert_not_includes json_response.keys, "updated_at"
  end

  test "should not get venue verified, created_at & updated_at" do
    get api_events_url
    assert_response :success
    json_response = JSON.parse(response.body)
    first_event = json_response.first
    venue = first_event["venue"]
    assert_not_includes venue.keys, "verified"
    assert_not_includes venue.keys, "created_at"
    assert_not_includes venue.keys, "updated_at"
  end

  test "should filter events by keyword" do
    get api_events_url, params: { q: @event.name }
    assert_response :success
    json_response = JSON.parse(response.body)
    assert_not_empty json_response
    json_response.each do |event|
      assert_includes event["name"].downcase, @event.name.downcase
    end
  end

  test "should filter events by date range" do
    date = @event.datetime.strftime("%m-%d-%Y")
    get api_events_url, params: { 
      start: date,
      end: date,
    }
    assert_response :success
    json_response = JSON.parse(response.body)
    assert_not_empty json_response
  end

  test "should filter events by location" do
    get api_events_url, params: {
      lat: @venue.latitude,
      long: @venue.longitude,
      radius: 10
    }
    assert_response :success
    json_response = JSON.parse(response.body)
    assert_not_empty json_response
    json_response.each do |event|
      venue = event["venue"]
      distance = Geocoder::Calculations.distance_between(
        [@venue.latitude, @venue.longitude],
        [venue["latitude"], venue["longitude"]]
      )
      assert distance <= 10
    end
  end

  test "should combine multiple filters" do
    event_date = @event.datetime.to_date
    start_date = event_date.beginning_of_day
    end_date = event_date.end_of_day

    get api_events_url, params: {
      q: @event.name,
      start: start_date.strftime("%m-%d-%Y"),
      end: end_date.strftime("%m-%d-%Y")
    }
    assert_response :success
    json_response = JSON.parse(response.body)
    assert_not_empty json_response
    json_response.each do |event|
      assert_includes event["name"], @event.name
      assert_equal @venue.id, event["venue"]["id"]
      expected_time = @event.datetime
      assert_equal expected_time, event["datetime"]
    end
  end
end
