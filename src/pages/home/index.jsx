import { useEffect, useState } from "react"
import { Search, Wind, Droplets, Gauge, Sun, Cloud, CloudRain } from "lucide-react"

const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY


export default function Home() {
  const [searchQuery, setSearchQuery] = useState("New Delhi")
  const [weatherData, setWeatherData] = useState(null)
  const [forecastData, setForecastData] = useState([])

  const getWeatherIcon = (iconType) => {
    switch (iconType) {
      case "Clear":
        return <Sun className="h-8 w-8 text-yellow-400" />
      case "Clouds":
        return <Cloud className="h-8 w-8 text-white" />
      case "Rain":
        return <CloudRain className="h-8 w-8 text-blue-400" />
      default:
        return <Sun className="h-8 w-8 text-yellow-400" />
    }
  }

  const fetchWeather = async (city) => {
    try {
      const weatherRes = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
      )
      const weather = await weatherRes.json()

      const forecastRes = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric`
      )
      const forecast = await forecastRes.json()

      setWeatherData(weather)
      setForecastData(
        forecast.list.filter((_, i) => i % 8 === 0).slice(0, 5) // get 5 days forecast
      )
    } catch (err) {
      console.error("Error fetching weather:", err)
    }
  }

  useEffect(() => {
    fetchWeather(searchQuery)
  }, [])

  const handleSearch = () => {
    fetchWeather(searchQuery)
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-2">Check Real-Time Weather</h1>
        <p className="text-xl text-white/80 mb-6">Anywhere in the World</p>

        <div className="flex justify-center gap-2">
          <input
            type="text"
            placeholder="Enter city name..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="p-2 px-4 rounded-lg border border-white/30 bg-white/10 text-white placeholder:text-white/70"
          />
          <button onClick={handleSearch} className="p-2 px-4 bg-white/20 rounded-lg hover:bg-white/30">
            <Search className="h-5 w-5 text-white" />
          </button>
        </div>
      </div>

      {/* Weather Info */}
      {weatherData && (
        <div className="bg-white/20 backdrop-blur-xl border border-white/30 rounded-xl p-6 text-white mb-12">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-2xl font-bold">{weatherData.name}, {weatherData.sys.country}</h2>
              <p className="text-white/80 mb-4">{new Date().toLocaleString()}</p>
              <div className="flex items-center gap-4 mb-2">
                <span className="text-6xl font-bold">{Math.round(weatherData.main.temp)}°</span>
                {getWeatherIcon(weatherData.weather[0].main)}
              </div>
              <p className="text-xl">{weatherData.weather[0].description}</p>
            </div>

            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <Wind className="h-6 w-6 mx-auto mb-2" />
                <p>Wind</p>
                <p className="font-semibold">{weatherData.wind.speed} km/h</p>
              </div>
              <div>
                <Droplets className="h-6 w-6 mx-auto mb-2" />
                <p>Humidity</p>
                <p className="font-semibold">{weatherData.main.humidity}%</p>
              </div>
              <div>
                <Gauge className="h-6 w-6 mx-auto mb-2" />
                <p>Pressure</p>
                <p className="font-semibold">{weatherData.main.pressure} mb</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Forecast */}
      <div>
        <h3 className="text-2xl font-bold text-white mb-4">5-Day Forecast</h3>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {forecastData.map((day, index) => (
            <div
              key={index}
              className="p-4 bg-white/10 rounded-xl text-white text-center backdrop-blur-md border border-white/20 hover:scale-105 transition-transform duration-300"
            >
              <p className="font-semibold mb-1">{new Date(day.dt_txt).toLocaleDateString("en-US", { weekday: "long" })}</p>
              <div className="mb-2">{getWeatherIcon(day.weather[0].main)}</div>
              <p className="capitalize text-sm mb-1">{day.weather[0].description}</p>
              <div className="flex justify-center gap-2 text-sm">
                <span className="font-semibold">{Math.round(day.main.temp_max)}°</span>
                <span className="text-white/60">{Math.round(day.main.temp_min)}°</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
