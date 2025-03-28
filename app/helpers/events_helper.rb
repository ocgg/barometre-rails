module EventsHelper
  def format_date(date)
    return "Aujourd'hui" if date == Date.today
    return "Demain" if date == Date.tomorrow

    l(date, format: "%A %d %B").split.map(&:capitalize).join(" ")
  end

  def format_hour(date)
    date.strftime("%Hh%M")
  end
end
