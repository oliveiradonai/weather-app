import { ApiWeatherData } from '../../types/weatherTypes';
import { Container, Logo } from './styles';

interface WeatherData {
    weather: ApiWeatherData | undefined
}

export function Weather({ weather }: WeatherData) {    
    const cityName = weather?.name ? weather.name : "";
    const country = weather?.sys.country;
    const temperature = weather?.main.temp ? weather?.main.temp : 0;
    
    return (
        <Container>
            <div className="weatherLocation">
                <h1>
                    {weather?.name ? `${cityName.toUpperCase()}, ${country}` : 'PESQUISE UMA LOCALIDADE'}                    
                </h1>
            </div>

            <div className="weatherData">
                <div>
                    <Logo 
                        weatherType={weather?.weather[0].main}
                    />
                    <h2>
                        {Math.floor(temperature)}°C
                    </h2>
                </div>
                <div>
                    <h3>
                        {weather?.weather[0].description.charAt(0).toUpperCase()}{weather?.weather[0].description.slice(1)}
                    </h3>
                </div>
            </div>
        </Container>
    )
}