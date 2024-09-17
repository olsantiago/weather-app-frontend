import React from 'react';
import { getCurrentAirQuality } from '../../api/weather';
import type { WeatherData, WeatherInformationContextType  } from '../../types';

type Props = {
  children?: React.ReactNode;
}

const defaultWeatherInformationContext: WeatherInformationContextType = {
  currentData: {
    message: '',
    cod: 0,
    name: '',
    main: {
      temp: 0,
      temp_max: 0,
      temp_min: 0,
    },
    weather: [],
    coord: {
      lon: 0,
      lat: 0
    }
  },
  setCurrentData: () => {},
  currentAirQuality: null
}

const WeatherInformationContext = React.createContext<WeatherInformationContextType>(defaultWeatherInformationContext);

const WeatherInformationProvider= ({ children }: Props) => {
  const [currentData, setCurrentData] = React.useState<WeatherData>(defaultWeatherInformationContext.currentData);
  const [currentAirQuality, setCurrentAirQuality] = React.useState<number | null>(null);

  const fetchCurrentAirQuality = React.useCallback(async () => {
    const data = await getCurrentAirQuality(currentData.coord.lon, currentData.coord.lat);
    if(data?.list[0]?.main.aqi) {
      setCurrentAirQuality(data?.list[0]?.main.aqi);
    }
  }, [currentData, setCurrentAirQuality]);

  React.useEffect(() => {
    if (currentData?.cod === 200) {
      fetchCurrentAirQuality();
    }
  }, [currentData, fetchCurrentAirQuality]);

  return (
    <WeatherInformationContext.Provider
      value={{
        currentData,
        setCurrentData,
        currentAirQuality
      }}
    >
      {children}
    </WeatherInformationContext.Provider>
  );
}

export { WeatherInformationProvider };

export function useWeatherInformation(): WeatherInformationContextType {
  return React.useContext(WeatherInformationContext);
}
