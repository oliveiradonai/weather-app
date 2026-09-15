import { IconMapPin, IconSearch } from "@tabler/icons-react";
import { useDeferredValue, useEffect, useMemo, useState } from "react";
import { formatString } from "../../Utils/format";
import { Cities } from "../../types/searchTypes";

interface SearchProps {
  selectedCity: Cities | undefined;
  onSelectCity: (city: Cities) => void;
}

const DEFAULT_CITY: Cities = {
  value: 3451328,
  label: "Ribeirão Preto",
  state: "",
  country: "BR",
  coord: {
    lon: -47.81028,
    lat: -21.1775,
  },
};

const MAX_RESULTS = 8;
let localesPromise: Promise<Cities[]> | undefined;

function getCityLabel(city: Cities) {
  return `${city.label}${city.state ? `, ${city.state}` : ""}, ${city.country}`;
}

async function loadLocales() {
  if (!localesPromise) {
    localesPromise = fetch("/localidades.json").then(async (response) => {
      if (!response.ok) {
        throw new Error("Não foi possível carregar a lista de cidades.");
      }

      return (await response.json()) as Cities[];
    });
  }

  return localesPromise;
}

function findCities(locales: Cities[], query: string) {
  const normalizedQuery = formatString(query.trim());

  if (normalizedQuery.length < 2) {
    return [];
  }

  const matches: Cities[] = [];

  for (const city of locales) {
    const haystack = formatString(`${city.label} ${city.state} ${city.country}`);

    if (haystack.includes(normalizedQuery)) {
      matches.push(city);
    }

    if (matches.length === MAX_RESULTS) {
      break;
    }
  }

  return matches;
}

export function getDefaultCity() {
  return DEFAULT_CITY;
}

export function Search({ selectedCity, onSelectCity }: SearchProps) {
  const [query, setQuery] = useState("");
  const [locales, setLocales] = useState<Cities[]>([]);
  const [loadError, setLoadError] = useState<string>();
  const deferredQuery = useDeferredValue(query);
  const shouldLoadLocales = deferredQuery.trim().length >= 2 && locales.length === 0 && !loadError;
  const results = useMemo(() => findCities(locales, deferredQuery), [deferredQuery, locales]);

  useEffect(() => {
    if (!shouldLoadLocales) {
      return;
    }

    let isActive = true;

    loadLocales()
      .then((cities) => {
        if (isActive) {
          setLocales(cities);
        }
      })
      .catch((error) => {
        if (isActive) {
          setLoadError(error instanceof Error ? error.message : "Não foi possível carregar cidades.");
        }
      });

    return () => {
      isActive = false;
    };
  }, [shouldLoadLocales]);

  return (
    <section className="mx-auto w-full max-w-6xl px-4 pt-5">
      <div className="relative">
        <label className="sr-only" htmlFor="city-search">
          Buscar localidade
        </label>
        <IconSearch className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-cyan-100/80" aria-hidden="true" />
        <input
          autoComplete="off"
          className="h-12 w-full rounded-lg border border-white/15 bg-slate-950/50 px-11 pr-32 text-base text-white outline-none backdrop-blur-xl transition-[border-color,background-color,box-shadow] duration-200 ease-out placeholder:text-slate-300 focus:border-cyan-200/70 focus:bg-slate-950/70 focus:shadow-[0_0_0_4px_rgba(103,232,249,0.13)]"
          id="city-search"
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Buscar cidade..."
          type="search"
          value={query}
        />
        <div className="pointer-events-none absolute right-3 top-1/2 hidden -translate-y-1/2 items-center gap-2 text-sm text-slate-300 sm:flex">
          <IconMapPin className="h-4 w-4 text-cyan-100/80" aria-hidden="true" />
          <span>{selectedCity ? getCityLabel(selectedCity) : "Nenhuma cidade"}</span>
        </div>

        {loadError ? (
          <div className="absolute left-0 right-0 top-14 z-20 rounded-lg border border-rose-200/30 bg-rose-950/90 px-4 py-3 text-sm text-rose-50 shadow-[0_24px_64px_rgba(2,6,23,0.48)] backdrop-blur-2xl">
            {loadError}
          </div>
        ) : null}

        {results.length > 0 ? (
          <div className="absolute left-0 right-0 top-14 z-20 overflow-hidden rounded-lg border border-white/15 bg-slate-950/92 shadow-[0_24px_64px_rgba(2,6,23,0.48)] backdrop-blur-2xl">
            {results.map((city) => (
              <button
                className="flex w-full items-center justify-between gap-4 px-4 py-3 text-left text-sm text-slate-100 hover:bg-white/10 focus:bg-white/10 focus:outline-none"
                key={city.value}
                onClick={() => {
                  onSelectCity(city);
                  setQuery("");
                }}
                type="button"
              >
                <span className="flex min-w-0 items-center gap-2">
                  <IconMapPin className="h-4 w-4 shrink-0 text-cyan-100/80" aria-hidden="true" />
                  <span className="truncate">{getCityLabel(city)}</span>
                </span>
                <span className="shrink-0 text-xs text-slate-400">
                  {city.coord.lat.toFixed(2)}, {city.coord.lon.toFixed(2)}
                </span>
              </button>
            ))}
          </div>
        ) : null}
      </div>
    </section>
  );
}
