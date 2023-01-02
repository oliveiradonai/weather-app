import { Container, Logo } from './styles';

export function Weather(props: any) {
    const weather = props.props;
    
    return (
        <Container>
            <div className="weatherLocation">
                <h1>
                    {weather?.name.toUpperCase()}, {weather?.sys.country}
                </h1>
            </div>

            <div className="weatherData">
                <div>
                    <Logo 
                        weatherType={weather?.weather[0].main}
                    />
                    <h2>
                        {Math.floor(weather?.main.temp)}°C
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