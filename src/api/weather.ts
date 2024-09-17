
import baseQuery from "./baseQuery";

export async function getCurrentWeather(location: string | null, longitude: number | null = null, latitude: number | null = null): Promise<any> {
  let params: { lon?: number | null; lat?: number | null; location?: string | null } = {};
  if (location === null && (longitude === null || latitude === null)) {
    // error catcher ex. BugSnag
    console.log("MUST PROVIDE LOCATION OR COORDINATES (LONGITUDE, LATITUDE)");
    return params;
  }

  if (longitude !== null && latitude !== null) {
    params.lon = longitude;
    params.lat = latitude;
  } else {
    params.location = location;
  }

  const response: any = await baseQuery({
    path: `/current_weather`,
    method: 'GET',
    params: params
  });

  return response?.data;
}

export async function getCurrentAirQuality(longitude: string | number, latitude: string | number): Promise<any> {
  const response = await baseQuery({
    path: `/current_air_quality`,
    method: 'GET',
    params: {
      lon: longitude,
      lat: latitude
    }
  });

  return response?.data;
}
