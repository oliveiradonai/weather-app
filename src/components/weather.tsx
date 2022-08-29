import styles from '../styles/weather.module.scss';

export function Weather(props: any) {
    const weather = props.props;
    return (
        <>
            <div className={styles.weatherLocation}>
                <h1>
                    {weather?.name.toUpperCase()}, {weather?.sys.country}
                </h1>
            </div>

            <div className={styles.weatherData}>
                <h2>
                    {weather?.main.temp}°C
                </h2>
                <h3>
                    {weather?.weather[0].description.charAt(0).toUpperCase()}{weather?.weather[0].description.slice(1)}
                </h3>
            </div>
        </>
    )
}