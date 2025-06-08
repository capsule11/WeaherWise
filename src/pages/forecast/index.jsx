import { useEffect, useState } from "react"
import axios from "axios"
import { Sun, Cloud, CloudRain, Wind, Droplets, Eye, Thermometer } from "lucide-react"

const Forecast = () => {
  const [forecast, setForecast] = useState([])
  const [selectedDay, setSelectedDay] = useState(0)
  const [tempUnit, setTempUnit] = useState("C")
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  const city = "New Delhi"
  const apiKey = import.meta.env.VITE_OPENWEATHER_API_KEY

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const res = await axios.get(
          `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${apiKey}`
        )
        const grouped = groupByDay(res.data.list)
        setForecast(grouped)
        setLoading(false)
      } catch (err) {
        setError("Failed to load forecast.")
        setLoading(false)
      }
    }

    fetchWeather()
  }, [])

  const convertTemp = (temp) =>
    tempUnit === "F" ? Math.round((temp * 9) / 5 + 32) : Math.round(temp)

  const getWeatherIcon = (main, size = "h-8 w-8") => {
    if (main.toLowerCase().includes("rain")) return <CloudRain className={`${size} text-blue-400`} />
    if (main.toLowerCase().includes("cloud")) return <Cloud className={`${size} text-gray-400`} />
    return <Sun className={`${size} text-yellow-400`} />
  }

  const groupByDay = (list) => {
    const days = {}
    list.forEach((entry) => {
      const date = new Date(entry.dt_txt).toDateString()
      if (!days[date]) days[date] = []
      days[date].push(entry)
    })

    return Object.entries(days).map(([date, entries]) => {
      const temps = entries.map((e) => e.main.temp)
      const high = Math.max(...temps)
      const low = Math.min(...temps)

      return {
        date,
        day: new Date(date).toLocaleDateString("en-US", { weekday: "long" }),
        icon: entries[3]?.weather[0]?.main || "Clear",
        high,
        low,
        description: entries[3]?.weather[0]?.description,
        wind: entries[3]?.wind.speed,
        humidity: entries[3]?.main.humidity,
        visibility: entries[3]?.visibility / 1000,
        uvIndex: Math.floor(Math.random() * 10),
        hourly: entries.slice(0, 6).map((e) => ({
          time: new Date(e.dt_txt).toLocaleTimeString("en-US", { hour: "numeric", hour12: true }),
          temp: e.main.temp,
          icon: e.weather[0].main,
        })),
      }
    })
  }

  if (loading) return <p className="text-white text-center py-10">Loading...</p>
  if (error) return <p className="text-red-400 text-center py-10">{error}</p>

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-white">5-Day Forecast for {city}</h1>
        <div className="flex gap-2">
          <button
            className={`px-4 py-2 rounded ${tempUnit === "C" ? "bg-white text-black" : "bg-transparent text-white border border-white"}`}
            onClick={() => setTempUnit("C")}
          >
            °C
          </button>
          <button
            className={`px-4 py-2 rounded ${tempUnit === "F" ? "bg-white text-black" : "bg-transparent text-white border border-white"}`}
            onClick={() => setTempUnit("F")}
          >
            °F
          </button>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Daily Forecast */}
        <div className="lg:col-span-1 space-y-4">
          {forecast.map((day, index) => (
            <div
              key={index}
              className={`glass p-4 rounded cursor-pointer transition-all duration-300 hover:bg-white/20 ${
                selectedDay === index ? "ring-2 ring-white/50" : ""
              }`}
              onClick={() => setSelectedDay(index)}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white font-semibold">{day.day}</p>
                  <p className="text-white/60 text-sm">{day.date}</p>
                </div>
                <div className="flex items-center gap-3">
                  {getWeatherIcon(day.icon)}
                  <div className="text-right">
                    <p className="text-white font-bold">{convertTemp(day.high)}°</p>
                    <p className="text-white/60 text-sm">{convertTemp(day.low)}°</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Selected Day Details */}
        <div className="lg:col-span-2 space-y-6">
          <div className="glass p-6 rounded">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
              {getWeatherIcon(forecast[selectedDay].icon)} {forecast[selectedDay].date}
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <p className="text-3xl font-bold text-white mb-2">
                  {convertTemp(forecast[selectedDay].high)}° / {convertTemp(forecast[selectedDay].low)}°
                </p>
                <p className="text-white/80 mb-4 capitalize">{forecast[selectedDay].description}</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <WeatherMetric icon={<Wind />} label="Wind" value={`${forecast[selectedDay].wind} km/h`} />
                <WeatherMetric icon={<Droplets />} label="Humidity" value={`${forecast[selectedDay].humidity}%`} />
                <WeatherMetric icon={<Eye />} label="Visibility" value={`${forecast[selectedDay].visibility} km`} />
                <WeatherMetric icon={<Thermometer />} label="UV Index" value={forecast[selectedDay].uvIndex} />
              </div>
            </div>
          </div>

          {/* Hourly */}
          <div className="glass p-6 rounded">
            <h2 className="text-xl font-semibold text-white mb-4">Hourly Forecast</h2>
            <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
              {forecast[selectedDay].hourly.map((hour, i) => (
                <div key={i} className="text-center p-3 glass rounded-lg">
                  <p className="text-white/60 text-sm mb-2">{hour.time}</p>
                  <div className="mb-2 flex justify-center">{getWeatherIcon(hour.icon, "h-6 w-6")}</div>
                  <p className="text-white font-semibold">{convertTemp(hour.temp)}°</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

const WeatherMetric = ({ icon, label, value }) => (
  <div className="text-center p-3 glass rounded-lg">
    <div className="h-5 w-5 text-white/80 mx-auto mb-1">{icon}</div>
    <p className="text-white/60 text-xs">{label}</p>
    <p className="text-white font-semibold">{value}</p>
  </div>
)

export default Forecast;
