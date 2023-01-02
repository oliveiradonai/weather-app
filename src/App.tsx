import { useFetch } from "./hooks/useFetch";
import { Container, GlobalStyle } from "./styles/global";
import { Footer } from "./components/Footer/Footer";
import { Loading } from "./components/Loading/Loading";
import { Weather } from "./components/WatherData/WeatherData";
import { Search } from "./components/Search/Search";

interface WeatherData {
  name: string;
  main: Main
  weather: Weather[];
}
interface Main {
  temp: number;
  feels_like: number;
  temp_min: number;
  temp_max: number;
  pressure: number;
  humidity: number;
}

interface Weather {
  id: number;
  main: string;
}

function App() {
  const baseUrl = process.env.REACT_APP_API_BASE_URL;
  const cityCode = 3451328;

  const { data: weather, loading, error } = useFetch<WeatherData>(`${baseUrl}/?id=${cityCode}&units=metric&lang=pt_br`);

  return (
    <Container
      weatherType={weather?.weather[0].main}
    >
      <Search />
      {error ? <div>ERRO</div> : null}
      {loading ?
        <Loading />
        :
        <Weather props={weather} />
      }
      <Footer />
      <GlobalStyle />
    </Container>
  )

}

export default App