module EventsHelper
  def format_date(date)
    return "Aujourd'hui" if date == Date.today
    return "Demain" if date == Date.tomorrow

    format = (date.year == Date.today.year) ? "%A %d %B" : "%A %d %B %Y"

    l(date, format:).split.map(&:capitalize).join(" ")
  end

  def format_hour(date)
    date.strftime("%Hh%M")
  end

  def navbar_btn_color(action)
    if params[:action] == action
      "fill-baro-yellow"
    elsif action == "menu" && %w[about contact new].include?(params[:action])
      "fill-baro-yellow"
    else
      "fill-(--light-bg)"
    end
  end

  def venue_fields_mode(venue)
    return "search" unless venue

    venue.persisted? ? "found" : "manual"
  end
end
