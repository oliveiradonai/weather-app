"use client";

import { IconAlertTriangle } from "@tabler/icons-react";
import { useState } from "react";
import { Footer } from "../Footer/Footer";
import { Loading } from "../Loading/Loading";
import { getDefaultCity, Search } from "../Search/Search";
import { WeatherDashboard } from "../WeatherDashboard/WeatherDashboard";
import { getWeatherBackground } from "../WeatherDashboard/weatherAssets";
import { useWeather } from "../../hooks/useWeather";
import { Cities } from "../../types/searchTypes";

export function WeatherApp() {
  const [selectedCity, setSelectedCity] = useState<Cities | undefined>(() => getDefaultCity());
  const { data: weather, error, isLoading } = useWeather(selectedCity);
  const condition = weather?.current.weather[0]?.main;
  const background = getWeatherBackground(condition);

  return (
    <div
      className="relative flex min-h-screen flex-col overflow-x-hidden bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: `linear-gradient(120deg, rgba(4, 10, 22, 0.86), rgba(15, 23, 42, 0.42)), url(${background.src})`,
      }}
    >
      <Search onSelectCity={setSelectedCity} selectedCity={selectedCity} />
      {isLoading ? <Loading /> : null}
      {!isLoading && error ? (
        <main className="mx-auto flex w-full max-w-6xl flex-1 items-center px-4 py-12">
          <section className="rounded-lg border border-rose-200/30 bg-rose-950/35 p-5 text-rose-50 backdrop-blur-xl">
            <div className="flex items-start gap-3">
              <IconAlertTriangle className="mt-1 h-6 w-6 shrink-0 text-rose-100" aria-hidden="true" />
              <div>
                <h1 className="text-xl font-semibold">Não foi possível carregar a previsão</h1>
                <p className="mt-2 text-sm text-rose-100/85">{error}</p>
              </div>
            </div>
          </section>
        </main>
      ) : null}
      {!isLoading && weather && selectedCity ? <WeatherDashboard city={selectedCity} weather={weather} /> : null}
      <Footer />
    </div>
  );
}
