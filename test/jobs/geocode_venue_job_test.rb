require "test_helper"

class GeocodeVenueJobTest < ActiveJob::TestCase
  def setup
    Geocoder.configure(lookup: :test, ip_lookup: :test)
    @venue = venues(:ungenerated)
  end


  test "performs geocoding for a venue" do
    assert_enqueued_with(job: GeocodeVenueJob, args: [@venue]) do
      @venue.geocode_later
    end
  end

  test "updates venue coordinates after geocoding" do
    # Mock the geocoding service to return known coordinates
    Geocoder::Lookup::Test.add_stub(
      @venue.full_address,
      [
        {
          'latitude' => 47.2181,
          'longitude' => -1.5528,
          'address' => @venue.full_address,
          'county' => 'Loire-Atlantique',
          'country' => 'France'
        }
      ]
    )

    perform_enqueued_jobs do
      GeocodeVenueJob.perform_now(@venue)
    end

    @venue.reload
    assert_equal 47.2181, @venue.latitude
    assert_equal -1.5528, @venue.longitude
    assert @venue.geocoded?
  end

  test "handles geocoding failure gracefully" do
    # Mock the geocoding service to return no results
    Geocoder::Lookup::Test.add_stub(
      @venue.full_address,
      []
    )

    perform_enqueued_jobs do
      GeocodeVenueJob.perform_now(@venue)
    end

    @venue.reload
    assert_nil @venue.latitude
    assert_nil @venue.longitude
    assert_not @venue.geocoded?
  end
end
