import { useEffect, useState } from "react";
import { Cities } from "../types/searchTypes";
import { WeatherDashboardData } from "../types/weatherTypes";

interface WeatherState {
  data?: WeatherDashboardData;
  error?: string;
  isLoading: boolean;
}

function buildWeatherUrl(city: Cities) {
  const url = new URL("/api/weather", window.location.origin);

  url.searchParams.set("lat", String(city.coord.lat));
  url.searchParams.set("lon", String(city.coord.lon));

  return url.toString();
}

export function useWeather(city: Cities | undefined): WeatherState {
  const [state, setState] = useState<WeatherState>({ isLoading: Boolean(city) });

  useEffect(() => {
    if (!city) {
      setState({ isLoading: false, error: "Selecione uma localidade para ver a previsão." });
      return;
    }

    const activeCity = city;
    const controller = new AbortController();

    async function loadWeather() {
      setState((currentState) => ({ ...currentState, error: undefined, isLoading: true }));

      try {
        const response = await fetch(buildWeatherUrl(activeCity), { signal: controller.signal });
        const payload = (await response.json()) as WeatherDashboardData | { error?: string };

        if (!response.ok) {
          throw new Error("error" in payload && payload.error ? payload.error : "Não foi possível buscar a previsão.");
        }

        setState({ isLoading: false, data: payload as WeatherDashboardData });
      } catch (error) {
        if (controller.signal.aborted) {
          return;
        }

        setState({
          isLoading: false,
          error: error instanceof Error ? error.message : "Não foi possível buscar a previsão.",
        });
      }
    }

    loadWeather();

    return () => controller.abort();
  }, [city]);

  return state;
}

