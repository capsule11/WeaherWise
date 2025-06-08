import { useState, useEffect } from "react";
import { Plus, Trash2 } from "lucide-react";

const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;

export default function SavedCities() {
  const [savedCities, setSavedCities] = useState([]);
  const [newCity, setNewCity] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Load cities from localStorage on first load
  useEffect(() => {
    const stored = localStorage.getItem("weatherApp_savedCities");
    if (stored) {
      setSavedCities(JSON.parse(stored));
    }
  }, []);

  // Save cities to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("weatherApp_savedCities", JSON.stringify(savedCities));
  }, [savedCities]);

  const fetchWeather = async (cityName) => {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}&units=metric`;
    const res = await fetch(url);
    if (!res.ok) throw new Error("City not found");
    const data = await res.json();

    return {
      id: Date.now().toString(),
      name: data.name,
      country: data.sys.country,
      temperature: Math.round(data.main.temp),
      description: data.weather[0].main,
      icon: data.weather[0].icon,
      addedAt: new Date().toLocaleString(),
    };
  };

  const addCity = async () => {
    const trimmed = newCity.trim();
    if (!trimmed) return;

    if (
      savedCities.some(
        (city) => city.name.toLowerCase() === trimmed.toLowerCase()
      )
    ) {
      setError("City already saved.");
      setNewCity("");
      return;
    }

    try {
      setLoading(true);
      setError("");
      const weatherData = await fetchWeather(trimmed);
      setSavedCities([weatherData, ...savedCities]);
      setNewCity("");
    } catch (err) {
      setError("City not found. Please check the name.");
    } finally {
      setLoading(false);
    }
  };

  const removeCity = (id) => {
    const updated = savedCities.filter((city) => city.id !== id);
    setSavedCities(updated);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-4">Saved Cities</h1>
        <p className="text-white/80 mb-6">
          Add cities to see current weather info.
        </p>

        {/* Input + Add */}
        <div className="glass mb-6 p-4">
          <div className="flex gap-2 p">
            <input
              placeholder="Enter city name....."
              value={newCity}
              onChange={(e) => setNewCity(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && addCity()}
              className="glass text-white placeholder:text-white/60 border-white/30 p-2"
            />
            <button
              onClick={addCity}
              disabled={loading}
              className="glass hover:bg-white/20 p-4"
            >
              <Plus className="h-4 w-4 text-white" />
            </button>
          </div>
          {error && <p className="text-red-400 mt-2">{error}</p>}
        </div>
      </div>

      {/* Saved Cities */}
      {savedCities.length === 0 ? (
        <div className="bg-white/10 rounded-lg">
          <div className="p-6 text-center text-white/60">
            No cities added yet.
          </div>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {savedCities.map((city) => (
            <div
              key={city.id}
              className="bg-white/10 hover:bg-white/20 transition rounded-lg p-4"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-xl font-bold text-white">
                    {city.name}, {city.country}
                  </h3>
                  <p className="text-white/60 text-sm">{city.addedAt}</p>
                </div>
                <button
                  onClick={() => removeCity(city.id)}
                  className="text-red-400 hover:text-red-600"
                >
                  <Trash2 />
                </button>
              </div>
              <div className="mt-4 text-white">
                <p className="text-4xl font-bold">{city.temperature}°C</p>
                <p className="text-white/70 text-sm">{city.description}</p>
                <img
                  src={`https://openweathermap.org/img/wn/${city.icon}@2x.png`}
                  alt={city.description}
                  className="h-12 w-12 mt-2"
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
