import { NextRequest, NextResponse } from "next/server";
import {
  CurrentWeatherRecord,
  DailyWeatherRecord,
  HourlyWeatherRecord,
  WeatherCondition,
  WeatherDashboardData,
} from "../../../types/weatherTypes";

const DEFAULT_BASE_URL = "https://api.openweathermap.org/data/2.5";
const API_KEY = process.env.OPENWEATHER_API_KEY;

interface OpenWeatherErrorResponse {
  cod?: number | string;
  code?: number | string;
  message?: string;
  parameters?: string[];
}

interface CurrentWeatherResponse {
  weather: WeatherCondition[];
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    humidity: number;
  };
  visibility?: number;
  wind: {
    speed: number;
    deg: number;
    gust?: number;
  };
  clouds: {
    all: number;
  };
  dt: number;
  sys: {
    sunrise?: number;
    sunset?: number;
    country?: string;
  };
  timezone: number;
  name: string;
}

interface ForecastItem {
  dt: number;
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    humidity: number;
  };
  weather: WeatherCondition[];
  clouds: {
    all: number;
  };
  wind: {
    speed: number;
    deg: number;
    gust?: number;
  };
  visibility?: number;
  pop?: number;
}

interface ForecastResponse {
  list: ForecastItem[];
  city: {
    timezone: number;
    sunrise?: number;
    sunset?: number;
    name: string;
    country: string;
  };
}

function buildWeatherUrl(endpoint: "weather" | "forecast", lat: string, lon: string) {
  const url = new URL(`${process.env.OPENWEATHER_BASE_URL ?? DEFAULT_BASE_URL}/${endpoint}`);

  url.searchParams.set("lat", lat);
  url.searchParams.set("lon", lon);
  url.searchParams.set("units", "metric");
  url.searchParams.set("lang", "pt_br");
  url.searchParams.set("appid", API_KEY ?? "");

  return url;
}

async function readOpenWeatherError(response: Response) {
  try {
    const payload = (await response.json()) as OpenWeatherErrorResponse;
    return payload.message ?? `OpenWeather respondeu com status ${response.status}`;
  } catch {
    return `OpenWeather respondeu com status ${response.status}`;
  }
}

async function fetchOpenWeather<TResponse>(endpoint: "weather" | "forecast", lat: string, lon: string) {
  const response = await fetch(buildWeatherUrl(endpoint, lat, lon), {
    next: { revalidate: 600 },
  });

  if (!response.ok) {
    throw new Error(await readOpenWeatherError(response));
  }

  return (await response.json()) as TResponse;
}

function mapCurrentWeather(response: CurrentWeatherResponse): CurrentWeatherRecord {
  return {
    dt: response.dt,
    sunrise: response.sys.sunrise,
    sunset: response.sys.sunset,
    temp: response.main.temp,
    feels_like: response.main.feels_like,
    pressure: response.main.pressure,
    humidity: response.main.humidity,
    clouds: response.clouds.all,
    visibility: response.visibility,
    wind_speed: response.wind.speed,
    wind_gust: response.wind.gust,
    wind_deg: response.wind.deg,
    weather: response.weather,
  };
}

function mapHourlyForecast(item: ForecastItem): HourlyWeatherRecord {
  return {
    dt: item.dt,
    temp: item.main.temp,
    feels_like: item.main.feels_like,
    pressure: item.main.pressure,
    humidity: item.main.humidity,
    clouds: item.clouds.all,
    visibility: item.visibility,
    wind_speed: item.wind.speed,
    wind_gust: item.wind.gust,
    wind_deg: item.wind.deg,
    weather: item.weather,
    pop: item.pop,
  };
}

function getLocalDayKey(timestamp: number, timezoneOffset: number) {
  const localDate = new Date((timestamp + timezoneOffset) * 1000);
  return localDate.toISOString().slice(0, 10);
}

function mapDailyForecast(items: ForecastItem[], timezoneOffset: number): DailyWeatherRecord[] {
  const groups = new Map<string, ForecastItem[]>();

  for (const item of items) {
    const key = getLocalDayKey(item.dt, timezoneOffset);
    const group = groups.get(key);

    if (group) {
      group.push(item);
    } else {
      groups.set(key, [item]);
    }
  }

  return Array.from(groups.values()).map((dayItems) => {
    let min = dayItems[0].main.temp_min;
    let max = dayItems[0].main.temp_max;
    let tempTotal = 0;
    let humidityTotal = 0;
    let pop = 0;
    let representative = dayItems[0];

    for (const item of dayItems) {
      min = Math.min(min, item.main.temp_min);
      max = Math.max(max, item.main.temp_max);
      tempTotal += item.main.temp;
      humidityTotal += item.main.humidity;
      pop = Math.max(pop, item.pop ?? 0);

      const hour = new Date((item.dt + timezoneOffset) * 1000).getUTCHours();
      if (hour >= 11 && hour <= 15) {
        representative = item;
      }
    }

    const averageTemp = tempTotal / dayItems.length;
    const averageHumidity = Math.round(humidityTotal / dayItems.length);

    return {
      dt: representative.dt,
      temp: {
        day: averageTemp,
        min,
        max,
        night: min,
        eve: averageTemp,
        morn: averageTemp,
      },
      feels_like: {
        day: representative.main.feels_like,
        night: representative.main.feels_like,
        eve: representative.main.feels_like,
        morn: representative.main.feels_like,
      },
      pressure: representative.main.pressure,
      humidity: averageHumidity,
      wind_speed: representative.wind.speed,
      wind_gust: representative.wind.gust,
      wind_deg: representative.wind.deg,
      weather: representative.weather,
      clouds: representative.clouds.all,
      pop,
    };
  });
}

function getTimezoneName(timezoneOffset: number) {
  const sign = timezoneOffset >= 0 ? "+" : "-";
  const absoluteOffset = Math.abs(timezoneOffset);
  const hours = Math.floor(absoluteOffset / 3600).toString().padStart(2, "0");
  const minutes = Math.floor((absoluteOffset % 3600) / 60).toString().padStart(2, "0");

  return `UTC${sign}${hours}:${minutes}`;
}

export async function GET(request: NextRequest) {
  const lat = request.nextUrl.searchParams.get("lat");
  const lon = request.nextUrl.searchParams.get("lon");

  if (!lat || !lon) {
    return NextResponse.json({ error: "Latitude e longitude são obrigatórias." }, { status: 400 });
  }

  if (!API_KEY) {
    return NextResponse.json({ error: "Configure OPENWEATHER_API_KEY no arquivo .env.local." }, { status: 500 });
  }

  try {
    const [currentResponse, forecastResponse] = await Promise.all([
      fetchOpenWeather<CurrentWeatherResponse>("weather", lat, lon),
      fetchOpenWeather<ForecastResponse>("forecast", lat, lon),
    ]);

    const timezoneOffset = forecastResponse.city.timezone ?? currentResponse.timezone;
    const weather: WeatherDashboardData = {
      current: mapCurrentWeather(currentResponse),
      hourly: forecastResponse.list.slice(0, 8).map(mapHourlyForecast),
      daily: mapDailyForecast(forecastResponse.list, timezoneOffset).slice(0, 5),
      timezone: getTimezoneName(timezoneOffset),
      timezoneOffset,
    };

    return NextResponse.json(weather);
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Não foi possível buscar a previsão." },
      { status: 502 },
    );
  }
}
