import React from "react";

//used types
export type WeatherData = {
  message: string;
  cod: number | string;
  name: string;
  main: {
    temp: number;
    temp_max: number;
    temp_min: number;
  };
  weather: Array<{
    description: string;
    main: string;
  }>;
  coord: {
    lon: number,
    lat: number
  }
}

export type WeatherInformationContextType = {
  currentData: WeatherData;
  setCurrentData: React.Dispatch<React.SetStateAction<WeatherData>>;
  currentAirQuality: number | null
}
