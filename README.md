# Weather App

A Next.js + React weather dashboard inspired by the Windows Weather app. It uses OpenWeather's free Current Weather and 5 day / 3 hour Forecast APIs through a server-side route handler, native `fetch`, Tailwind CSS, and local weather imagery.

## Setup

Create `.env.local` in the project root:

```env
OPENWEATHER_API_KEY=your_openweather_key
```

Optional:

```env
OPENWEATHER_BASE_URL=https://api.openweathermap.org/data/2.5
```

The route handler calls the free OpenWeather 2.5 `/weather` and `/forecast` endpoints by latitude and longitude. Keeping the API call server-side avoids exposing the key in browser JavaScript.

## Scripts

```bash
bun install
bun run dev
bun run build
bun run preview
```

## Notes

The free forecast endpoint returns data every 3 hours for up to 5 days, so the daily forecast cards are derived from those 3-hour entries. UV index, dew point, and official weather alerts require paid One Call data and will show `--` when unavailable.
