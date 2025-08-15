module EventsHelper
  def format_date(date)
    return "Aujourd'hui" if date == Date.today
    return "Demain" if date == Date.tomorrow

    format = (date.year == Date.today.year) ? "%A %d %B" : "%A %d %B %Y"

    l(date, format:).split.map(&:capitalize).join(" ")
  end

  def format_with_two_digits(time)
    return if time.nil?
    (time < 10) ? "0#{time}" : time
  end

  def date_to_ddMyyyy(date)
    format = "%d %B %Y"
    l(date, format:)
  end

  def navbar_btn_color(action)
    if params[:action] == action
      "fill-baro-yellow"
    elsif action == "new" && params[:action] == "create"
      "fill-baro-yellow"
    elsif action == "menu" && %w[about contact contact_form_submit].include?(params[:action])
      "fill-baro-yellow"
    else
      "fill-(--light-bg)"
    end
  end

  def venue_fields_mode(venue)
    if venue.persisted? then "found"
    elsif venue.attributes.values.all?(&:blank?) then "search"
    else
      "manual"
    end
  end
end
