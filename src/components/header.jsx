import { cn } from "../lib/utils"
import { Cloud, Home, Calendar, MapPin, Bookmark, Info } from "lucide-react"


const navItems = [
  { href: "/", label: "Home", icon: Home },
  { href: "/forecast", label: "Forecast", icon: Calendar },
  { href: "/saved-cities", label: "Saved Cities", icon: Bookmark },
  { href: "/about", label: "About", icon: Info },
]

export default function Header() {
  // const pathname = usePathname()
  const pathname = window.location.pathname

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white-10 backdrop-blur-md bg-opacity-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <a href="/" className="flex items-center space-x-2 text-white font-bold text-xl">
            <Cloud className="h-8 w-8" />
            <span>WeatherWise</span>
          </a>

          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => {
              const Icon = item.icon
              return (
                <a
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex items-center space-x-2 px-3 py-2 rounded-lg transition-all duration-200 hover:bg-white/20",
                    pathname === item.href ? "bg-white/20 text-white" : "text-white/80 hover:text-white",
                  )}
                >
                  <Icon className="h-4 w-4" />
                  <span>{item.label}</span>
                </a>
              )
            })}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button className="text-white p-2">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </nav>
  )
}
