import { Github, ExternalLink, Cloud, Smartphone, Globe, Zap } from "lucide-react"


export default function About() {
  const technologies = [
    { name: "React js", description: "Core JavaScript library for building the user interface" },
    { name: "Vite", description: "Fast build tool for running and bundling the React project" },
    { name: "Tailwind CSS", description: "Utility-first CSS framework" },
    { name: "shadcn/ui", description: "Beautiful and accessible components" },
    { name: "OpenWeatherMap API", description: "Real-time weather data" },
    { name: "Geolocation API", description: "Location-based services" },
  ]

  const features = [
    {
      icon: <Cloud className="h-6 w-6" />,
      title: "Real-time Weather",
      description: "Get accurate, up-to-date weather information for any location worldwide",
    },
    {
      icon: <Smartphone className="h-6 w-6" />,
      title: "Responsive Design",
      description: "Optimized for all devices - desktop, tablet, and mobile",
    },
    {
      icon: <Globe className="h-6 w-6" />,
      title: "Global Coverage",
      description: "Weather data for cities and locations around the world",
    },
    {
      icon: <Zap className="h-6 w-6" />,
      title: "Fast & Reliable",
      description: "Lightning-fast performance with reliable data sources",
    },
  ]

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12 animate-slide-up">
          <h1 className="text-4xl font-bold text-white mb-4">About WeatherWise</h1>
          <p className="text-xl text-white/80 max-w-2xl mx-auto">
            A modern, beautiful weather application built with cutting-edge technologies to provide you with accurate
            weather information anywhere in the world.
          </p>
        </div>

        {/* App Purpose */}
        <div className="glass mb-8 animate-slide-up p-8">
          <div>
            <div className="text-white text-4xl pb-2">Our Mission</div>
          </div>
          <div>
            <p className="text-white/80 leading-relaxed">
              WeatherWise was created to provide users with a clean, intuitive, and beautiful way to check weather
              conditions. Whether you're planning your day, preparing for a trip, or just curious about the weather in
              different parts of the world, WeatherWise delivers accurate and timely weather information with a
              delightful user experience.
            </p>
          </div>
        </div>

        {/* Features */}
        <div className="glass mb-8 animate-slide-up p-8">
          <div>
            <div className="text-white text-4xl pb-2">Key Features</div>
          </div>
          <div>
            <div className="grid md:grid-cols-2 gap-6">
              {features.map((feature, index) => (
                <div key={index} className="flex gap-4">
                  <div className="text-white/80 mt-1">{feature.icon}</div>
                  <div>
                    <h3 className="text-white font-semibold mb-2">{feature.title}</h3>
                    <p className="text-white/70 text-sm">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* How it Works */}
        <div className="glass mb-8 animate-slide-up p-8">
          <div>
            <div className="text-white text-4xl pb-2">How It Works</div>
          </div>
          <div>
            <div className="space-y-4 text-white/80">
              <div className="flex gap-4">
                <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                  1
                </div>
                <div>
                  <h4 className="font-semibold text-white mb-1">Search or Locate</h4>
                  <p className="text-sm">Enter a city name or use your current GPS location</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                  2
                </div>
                <div>
                  <h4 className="font-semibold text-white mb-1">Fetch Data</h4>
                  <p className="text-sm">We retrieve real-time weather data from OpenWeatherMap API</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                  3
                </div>
                <div>
                  <h4 className="font-semibold text-white mb-1">Display Results</h4>
                  <p className="text-sm">Present beautiful, easy-to-understand weather information</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Technologies */}
        <div className="glass mb-8 animate-slide-up p-8">
          <div>
            <div className="text-white text-3xl pb-2">Technologies Used</div>
          </div>
          <div>
            <div className="grid md:grid-cols-2 gap-4">
              {technologies.map((tech, index) => (
                <div key={index} className="p-4 glass rounded-lg">
                  <h4 className="font-semibold text-white mb-1">{tech.name}</h4>
                  <p className="text-white/70 text-sm">{tech.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Links and Attribution */}
        <div className="grid md:grid-cols-2 gap-6 animate-slide-up">
          <div className="glass p-8">
            <div>
              <div className="text-white pb-2 text-3xl">Project Links</div>
            </div>
            <div>
              <div className="space-y-3">
                <a
                  href="https://github.com/capsule11/WeaherWise"
                  className="flex items-center gap-3 text-white/80 hover:text-white transition-colors"
                >
                  <Github className="h-5 w-5" />
                  <span>View on GitHub</span>
                  <ExternalLink className="h-4 w-4 ml-auto" />
                </a>
                <a
                  href="https://openweathermap.org"
                  className="flex items-center gap-3 text-white/80 hover:text-white transition-colors"
                >
                  <Cloud className="h-5 w-5" />
                  <span>OpenWeatherMap API</span>
                  <ExternalLink className="h-4 w-4 ml-auto" />
                </a>
              </div>
            </div>
          </div>

          <div className="glass p-8">
            <div>
              <div className="text-white pb-2 text-3xl">Attribution</div>
            </div>
            <div>
              <div className="space-y-3 text-white/80 text-sm">
                <p>Weather data provided by OpenWeatherMap</p>
                <p>Icons from Lucide React</p>
                <p>UI components from shadcn/ui</p>
                <p>Built using React.js and Tailwind CSS</p>
              </div>
            </div>
          </div>
        </div>

        {/* Contact */}
        <div className="glass mt-8 animate-slide-up">
          <div className="p-8 text-center">
            <h3 className="text-xl font-semibold text-white mb-4">Get in Touch</h3>
            <p className="text-white/80 mb-6">
              Have questions, suggestions, or found a bug? We'd love to hear from you!
            </p>
            <div className="flex justify-center gap-4">
              <a
                href="https://github.com/capsule11"
                className="glass px-6 py-2 rounded-lg text-white hover:bg-white/20 transition-colors"
              >
                GitHub Issues
              </a>
              <a
                href="mailto:sahiljaiswal550@gmail.com"
                className="glass px-6 py-2 rounded-lg text-white hover:bg-white/20 transition-colors"
              >
                Email Us
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
