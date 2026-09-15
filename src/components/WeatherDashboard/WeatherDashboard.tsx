import {
  IconCalendarWeek,
  IconCloud,
  IconCloudRain,
  IconDroplet,
  IconEye,
  IconGauge,
  IconSunHigh,
  IconSunrise,
  IconSunset,
  IconTemperature,
  IconWind,
  IconWindmill,
  type Icon,
} from "@tabler/icons-react";
import Image from "next/image";

import { Cities } from "../../types/searchTypes";
import { DailyWeatherRecord, HourlyWeatherRecord, WeatherDashboardData } from "../../types/weatherTypes";
import { getWeatherIcon } from "./weatherAssets";

interface WeatherDashboardProps {
  city: Cities;
  weather: WeatherDashboardData;
}

interface MetricCardProps {
  icon: Icon;
  label: string;
  value: string;
}

const numberFormatter = new Intl.NumberFormat("pt-BR", { maximumFractionDigits: 0 });
const percentFormatter = new Intl.NumberFormat("pt-BR", {
  maximumFractionDigits: 0,
  style: "percent",
});

function capitalize(value: string | undefined) {
  if (!value) {
    return "";
  }

  return `${value.charAt(0).toUpperCase()}${value.slice(1)}`;
}

function formatTemperature(value: number) {
  return `${numberFormatter.format(value)}°`;
}

function getOffsetDate(timestamp: number, timezoneOffset: number) {
  return new Date((timestamp + timezoneOffset) * 1000);
}

function formatTime(timestamp: number | undefined, timezoneOffset: number) {
  if (!timestamp) {
    return "--:--";
  }

  return new Intl.DateTimeFormat("pt-BR", {
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "UTC",
  }).format(getOffsetDate(timestamp, timezoneOffset));
}

function formatWeekday(timestamp: number, timezoneOffset: number) {
  return new Intl.DateTimeFormat("pt-BR", {
    weekday: "short",
    timeZone: "UTC",
  }).format(getOffsetDate(timestamp, timezoneOffset));
}

function windDirection(degrees: number) {
  const directions = ["N", "NE", "L", "SE", "S", "SO", "O", "NO"];
  return directions[Math.round(degrees / 45) % directions.length];
}

function MetricCard({ icon: Icon, label, value }: MetricCardProps) {
  return (
    <section className="rounded-lg border border-white/12 bg-slate-950/42 p-4 shadow-[0_18px_48px_rgba(2,6,23,0.20)] backdrop-blur-xl">
      <div className="flex items-center gap-2 text-slate-300">
        <Icon className="h-4 w-4 text-cyan-100/85" aria-hidden="true" />
        <p className="text-xs font-medium uppercase tracking-[0.14em]">{label}</p>
      </div>
      <p className="mt-2 text-2xl font-semibold text-white">{value}</p>
    </section>
  );
}

function HourlyForecast({ items, timezoneOffset }: { items: HourlyWeatherRecord[]; timezoneOffset: number }) {
  return (
    <section className="rounded-lg border border-white/12 bg-slate-950/42 p-5 backdrop-blur-xl">
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
        <h2 className="flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.14em] text-slate-200">
          <IconCloudRain className="h-4 w-4 text-cyan-100/85" aria-hidden="true" />
          Próximas horas
        </h2>
        <span className="inline-flex items-center gap-1 text-xs text-slate-300">
          <IconDroplet className="h-3.5 w-3.5 text-cyan-100/80" aria-hidden="true" />
          chance de chuva
        </span>
      </div>
      <div className="-mx-1 flex gap-3 overflow-x-auto px-1 pb-2 scrollbar-thin">
        {items.map((item) => {
          const condition = item.weather[0];

          return (
            <article
              className="flex min-h-32 w-16 shrink-0 flex-col items-center justify-between rounded-md bg-white/10 px-3 py-3.5 text-center"
              key={item.dt}
            >
              <span className="text-xs font-medium text-slate-200">{formatTime(item.dt, timezoneOffset)}</span>
              <Image alt="" className="h-9 w-9 object-contain" src={getWeatherIcon(condition?.main)} />
              <strong className="text-xl text-white">{formatTemperature(item.temp)}</strong>
              <span className="inline-flex items-center gap-1 text-xs text-slate-300">
                <IconDroplet className="h-3 w-3 text-cyan-100/75" aria-hidden="true" />
                {percentFormatter.format(item.pop ?? 0)}
              </span>
            </article>
          );
        })}
      </div>
    </section>
  );
}

function DailyForecast({ items, timezoneOffset }: { items: DailyWeatherRecord[]; timezoneOffset: number }) {
  return (
    <section className="rounded-lg border border-white/12 bg-slate-950/42 p-5 backdrop-blur-xl">
      <h2 className="mb-3 flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.14em] text-slate-200">
        <IconCalendarWeek className="h-4 w-4 text-cyan-100/85" aria-hidden="true" />
        5 dias
      </h2>
      <div className="space-y-2">
        {items.map((item) => {
          const condition = item.weather[0];

          return (
            <article className="grid grid-cols-[58px_1fr_76px] items-center gap-3 rounded-md bg-white/10 px-3 py-2" key={item.dt}>
              <span className="text-sm font-medium capitalize text-slate-100">{formatWeekday(item.dt, timezoneOffset)}</span>
              <div className="flex min-w-0 items-center gap-3">
                <Image alt="" className="h-8 w-8 object-contain" src={getWeatherIcon(condition?.main)} />
                <span className="truncate text-sm text-slate-200">{capitalize(condition?.description)}</span>
              </div>
              <span className="text-right text-sm font-semibold text-white">
                {formatTemperature(item.temp.max)} / {formatTemperature(item.temp.min)}
              </span>
            </article>
          );
        })}
      </div>
    </section>
  );
}

export function WeatherDashboard({ city, weather }: WeatherDashboardProps) {
  const { current, daily, hourly, timezone, timezoneOffset } = weather;
  const condition = current.weather[0];
  const alertCount = current.alerts?.length ?? 0;

  return (
    <main className="mx-auto grid w-full max-w-6xl flex-1 grid-cols-1 gap-4 px-4 pb-20 pt-4 lg:grid-cols-[minmax(0,1fr)_360px]">
      <section className="rounded-lg border border-white/12 bg-slate-950/38 p-5 shadow-[0_24px_80px_rgba(2,6,23,0.34)] backdrop-blur-2xl sm:p-7">
        <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
          <div>
            <p className="text-sm font-medium text-cyan-100">
              {city.label}, {city.country}
            </p>
            <h1 className="mt-2 text-6xl font-semibold leading-none text-white sm:text-7xl">{formatTemperature(current.temp)}</h1>
            <p className="mt-3 text-xl text-slate-100">{capitalize(condition?.description)}</p>
            <p className="mt-2 inline-flex items-center gap-2 text-sm text-slate-300">
              <IconTemperature className="h-4 w-4 text-cyan-100/80" aria-hidden="true" />
              Sensação de {formatTemperature(current.feels_like)} ({timezone})
            </p>
          </div>

          <div className="flex items-center justify-between gap-6 md:flex-col md:items-end">
            <Image
              alt={condition?.description ?? "Condição atual"}
              className="h-28 w-28 object-contain drop-shadow-[0_18px_28px_rgba(15,23,42,0.45)] sm:h-36 sm:w-36"
              src={getWeatherIcon(condition?.main)}
            />
            <div className="flex flex-col text-right text-sm text-slate-200">
              <p className="inline-flex items-center gap-2">
                <IconSunrise className="h-4 w-4 text-cyan-100/80" aria-hidden="true" />
                Nascer {formatTime(current.sunrise, timezoneOffset)}
              </p>
              <p className="inline-flex items-center gap-2">
                <IconSunset className="h-4 w-4 text-cyan-100/80" aria-hidden="true" />
                Pôr do sol {formatTime(current.sunset, timezoneOffset)}
              </p>
            </div>
          </div>
        </div>

        {alertCount > 0 ? (
          <div className="mt-6 rounded-lg border border-amber-300/40 bg-amber-300/14 px-4 py-3 text-sm text-amber-50">
            {alertCount} alerta{alertCount > 1 ? "s" : ""} meteorológico{alertCount > 1 ? "s" : ""} ativo
            {alertCount > 1 ? "s" : ""}.
          </div>
        ) : null}

        <div className="mt-6 grid grid-cols-2 gap-3 md:grid-cols-4">
          <MetricCard icon={IconWind} label="Vento" value={`${numberFormatter.format(current.wind_speed)} m/s ${windDirection(current.wind_deg)}`} />
          <MetricCard icon={IconWindmill} label="Rajada" value={current.wind_gust ? `${numberFormatter.format(current.wind_gust)} m/s` : "--"} />
          <MetricCard icon={IconDroplet} label="Umidade" value={`${current.humidity}%`} />
          <MetricCard icon={IconSunHigh} label="UV" value={current.uvi !== undefined ? numberFormatter.format(current.uvi) : "--"} />
          <MetricCard icon={IconEye} label="Visibilidade" value={current.visibility ? `${numberFormatter.format(current.visibility / 1000)} km` : "--"} />
          <MetricCard icon={IconGauge} label="Pressão" value={`${current.pressure} hPa`} />
          <MetricCard icon={IconCloud} label="Nuvens" value={`${current.clouds}%`} />
          <MetricCard icon={IconTemperature} label="Ponto de orvalho" value={current.dew_point !== undefined ? formatTemperature(current.dew_point) : "--"} />
        </div>
      </section>

      <aside className="space-y-4">
        <HourlyForecast items={hourly} timezoneOffset={timezoneOffset} />
        <DailyForecast items={daily} timezoneOffset={timezoneOffset} />
      </aside>
    </main>
  );
}



