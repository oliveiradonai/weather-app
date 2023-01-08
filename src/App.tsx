import { useFetch } from "./hooks/useFetch";
import { Container, GlobalStyle } from "./styles/global";
import { Footer } from "./components/Footer/Footer";
import { Loading } from "./components/Loading/Loading";
import { Weather } from "./components/WatherData/WeatherData";
import { Search } from "./components/Search/Search";
import { useState } from "react";

function App() {
  const [loading, setLoading] = useState<boolean>(true);
  const [cityCode, setCityCode] = useState<number | undefined>(3451328);

  const weather = useFetch({ cityCode: cityCode, setLoading });

  return (
    <Container
      weatherType={weather?.weather[0].main}
    >
      {loading ? <Loading /> :
        <>
          <Search
            setCityCode={setCityCode}
          />
          <Weather
            weather={weather}
          />
        </>
      }
      <Footer />
      <GlobalStyle />
    </Container>
  )
}

export default App