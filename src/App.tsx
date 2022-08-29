import { useFetch } from "./hooks/useFetch";
import '../src/styles/global.scss';
import { Loading } from "./components/loading";
import { Weather } from "./components/weather";

interface WeatherData {
  name: string;
  main: Main
}
interface Main {
  temp:       number;
  feels_like: number;
  temp_min:   number;
  temp_max:   number;
  pressure:   number;
  humidity:   number;
}

function App() {
  const baseUrl = process.env.REACT_APP_API_BASE_URL;
  const cityCode = 3451328;

  const { data: weather, loading, error } = useFetch<WeatherData>(`${baseUrl}/?id=${cityCode}&units=metric&lang=pt_br`);

  return (
    <div>
      {error ? <div>ERRO</div> : null}
      {loading ? 
        <Loading></Loading>
        : 
        <Weather props={weather}></Weather>
      }
      
    </div>
  )

}

export default App