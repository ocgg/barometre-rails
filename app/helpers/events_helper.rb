module EventsHelper
  def format_date(date)
    return "Aujourd'hui" if date == Date.today
    return "Demain" if date == Date.tomorrow

    l(date, format: "%A %d %B").split.map(&:capitalize).join(" ")
  end

  def format_hour(date)
    date.strftime("%Hh%M")
  end

  def navbar_btn_color(action)
    if params[:action] == action
      "fill-baro-yellow"
    elsif action == "menu" && %w[about contact].include?(params[:action])
      "fill-baro-yellow"
    else
      "fill-(--light-bg)"
    end
  end
end
