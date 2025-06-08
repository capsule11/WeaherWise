import { createContext, useContext, useState } from "react"

const City = createContext()

export const CityProvider = ({ children }) => {
  const [city, setCity] = useState("New Delhi") 

  return (
    <City.Provider value={{ city, setCity }}>
      {children}
    </City.Provider>
  )
}

export const useCity = () => useContext(City)
