export interface WeatherCondition {
  id: number;
  main: string;
  description: string;
  icon: string;
}

export interface CurrentWeatherRecord {
  dt: number;
  sunrise?: number;
  sunset?: number;
  temp: number;
  feels_like: number;
  pressure: number;
  humidity: number;
  dew_point?: number;
  uvi?: number;
  clouds: number;
  visibility?: number;
  wind_speed: number;
  wind_gust?: number;
  wind_deg: number;
  weather: WeatherCondition[];
  alerts?: string[];
}

export interface HourlyWeatherRecord extends CurrentWeatherRecord {
  pop?: number;
}

export interface DailyTemperature {
  day: number;
  min: number;
  max: number;
  night: number;
  eve: number;
  morn: number;
}

export interface DailyFeelsLike {
  day: number;
  night: number;
  eve: number;
  morn: number;
}

export interface DailyWeatherRecord {
  dt: number;
  sunrise?: number;
  sunset?: number;
  moonrise?: number;
  moonset?: number;
  moon_phase?: number;
  temp: DailyTemperature;
  feels_like: DailyFeelsLike;
  pressure: number;
  humidity: number;
  dew_point?: number;
  wind_speed: number;
  wind_gust?: number;
  wind_deg: number;
  weather: WeatherCondition[];
  clouds: number;
  pop?: number;
  uvi?: number;
}

export interface OneCallResponse<TRecord> {
  lat: number;
  lon: number;
  timezone: string;
  timezone_offset: number;
  data: TRecord[];
  prev?: string;
  next?: string;
}

export interface WeatherDashboardData {
  current: CurrentWeatherRecord;
  hourly: HourlyWeatherRecord[];
  daily: DailyWeatherRecord[];
  timezone: string;
  timezoneOffset: number;
}
