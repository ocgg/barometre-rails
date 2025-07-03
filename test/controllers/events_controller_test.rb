require "test_helper"

class EventsControllerTest < ActionDispatch::IntegrationTest
  def setup
    @admin = users(:admin)
    @visitor = User.new(role: "visitor")
    @event = events(:one)
    @unverified_event = events(:two)
  end

  test "visitor should get events index on root path" do
    get root_url
    assert_response :success
    assert_select "turbo-frame#content"
    assert_select "section#events_days_container"
  end

  test "visitor should get events index with turbo stream" do
    get events_url, headers: { "Accept": "text/vnd.turbo-stream.html" }
    assert_response :success
    assert_equal "text/vnd.turbo-stream.html", @response.media_type
  end

  test "visitor should get map" do
    get map_url
    assert_response :success
    assert_select "#map"
  end

  test "visitor should get calendar" do
    get calendar_url
    assert_response :success
  end

  test "visitor should get new event form" do
    get new_event_url
    assert_response :success
    assert_select "form"
  end

  test "visitor should create event" do
    assert_difference("Event.count") do
      post events_url, params: {
        events: [{
          name: "Nouvel événement",
          description: "Description",
          date: "03-16-2025",
          time: "19:00",
          tarif: "20€",
          venue_attributes: {
            name: "Nouveau lieu",
            address: "1 rue test",
            zipcode: "44000",
            city: "Nantes"
          }
        }]
      }
    end
    assert_redirected_to root_url
  end

  test "visitor should not create invalid event" do
    assert_no_difference("Event.count") do
      post events_url, params: {
        events: [{
          name: "",
          date: "03-16-2025",
          time: "19:00"
        }]
      }
    end
    assert_response :unprocessable_entity
  end

  test "visitor should be redirected to login page when showing event" do
    get event_url(@event)
    assert_redirected_to new_session_url
  end

  test "visitor should be redirected to login page when showing unverified event" do
    get event_url(@unverified_event)
    assert_redirected_to new_session_url
  end

  test "visitor should be redirected to login page when showing event partial with turbo frame" do
    get event_url(@event), headers: { "Turbo-Frame": "event_#{@event.id}" }
    assert_redirected_to new_session_url
  end

  test "visitor should be redirected to login page when accessing unverified events page" do
    get unverified_url
    assert_redirected_to new_session_url
  end

  test "visitor should be redirected to login page when getting edit form" do
    get edit_event_url(@event)
    assert_redirected_to new_session_url
  end

  test "visitor should be redirected to login page when updating event" do
    patch event_url(@event), params: {
      event: {
        name: "Événement modifié"
      }
    }
    assert_redirected_to new_session_url
  end

  test "visitor should be redirected to login page when verifying event" do
    patch verify_event_url(@event)
    assert_redirected_to new_session_url
  end

  test "visitor should be redirected to login page when destroying event" do
    assert_no_difference("Event.count") do
      delete event_url(@event)
    end
    assert_redirected_to new_session_url
  end

  test "admin should show event" do
    sign_in_as_admin
    get event_url(@event), headers: { "Turbo-Frame": "event_#{@event.id}" }
    assert_response :success
    assert_select "turbo-frame#event_#{@event.id}"
  end

  test "admin should show unverified event" do
    sign_in_as_admin
    get event_url(@unverified_event), headers: { "Turbo-Frame": "event_#{@unverified_event.id}" }
    assert_response :success
    assert_select "turbo-frame#event_#{@unverified_event.id}"
  end

  test "admin should show event partial with turbo frame" do
    sign_in_as_admin
    get event_url(@event), headers: { "Turbo-Frame": "event_#{@event.id}" }
    assert_response :success
    assert_select "turbo-frame#event_#{@event.id}"
  end

  test "admin should access unverified events page" do
    sign_in_as_admin
    get unverified_events_url
    assert_response :success
    assert_select "turbo-frame#content"
    assert_select "section#events_days_container"
  end

  test "admin should get edit form" do
    sign_in_as_admin
    get edit_event_url(@event)
    assert_response :success
    assert_select "form"
  end

  test "admin should update event" do
    sign_in_as_admin
    patch event_url(@event), params: {
      event: {
        name: "Événement modifié",
        description: "Nouvelle description",
        date: "03-16-2025",
        time: "20:00",
        tarif: "25€"
      }
    }
    assert_redirected_to @event
    @event.reload
    assert_equal "Événement modifié", @event.name
  end

  test "admin should not update event with invalid data" do
    sign_in_as_admin
    patch event_url(@event), params: {
      event: {
        name: ""
      }
    }
    assert_response :unprocessable_entity
  end

  test "admin should verify event" do
    sign_in_as_admin
    patch verify_event_url(@event)
    assert_response :success
    @event.reload
    assert @event.verified?
  end

  test "admin should not verify event with unverified venue" do
    sign_in_as_admin
    patch verify_event_url(@unverified_event)
    assert_response :unprocessable_entity
  end

  test "a verified event updated with an unverified venue should turn to unverified" do
    sign_in_as_admin
    unverified_venue = venues(:two)
    assert @event.verified?

    patch event_url(@event), params: {
      event: {
        venue_id: unverified_venue.id
      }
    }
    @event.reload
    assert_equal unverified_venue.id, @event.venue_id
    assert_not @event.verified?
  end

  test "admin should destroy event" do
    sign_in_as_admin
    assert_difference("Event.count", -1) do
      delete event_url(@event)
    end
  end

  private

  def sign_in_as_admin
    post session_url, params: {
      email_address: @admin.email_address,
      password: "password"
    }
  end
end
