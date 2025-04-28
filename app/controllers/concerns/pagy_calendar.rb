module PagyCalendar

  private

  # REQUIRED: return the start and end limits of the collection as a 2 items array
  def pagy_calendar_period(collection)
    starting = collection.minimum(:date)
    ending = collection.maximum(:date)
    [ starting.in_time_zone, ending.in_time_zone ]
  end

  # REQUIRED: return the collection filtered by a time period
  def pagy_calendar_filter(collection, from, to)
    collection.where(date: from...to)
  end

  # OPTIONAL: return the array counts per time
  # def pagy_calendar_counts(collection, unit, from, to)
  #   collection.group_by_period(unit, :date, range: from...to).count.values
  # end
end
