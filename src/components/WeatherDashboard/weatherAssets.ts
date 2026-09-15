import type { StaticImageData } from "next/image";
import ClearSky from "../../img/clear-sky.jpg";
import ClearIcon from "../../img/clear-sky-icon.png";
import Clouds from "../../img/few-clouds.jpg";
import CloudIcon from "../../img/cloud-icon.png";
import DefaultBackground from "../../img/default.jpg";
import Mist from "../../img/mist.jpg";
import MistIcon from "../../img/mist-icon.png";
import Rain from "../../img/rain.jpg";
import RainIcon from "../../img/rain-icon.png";
import Snow from "../../img/snow.jpg";
import SnowIcon from "../../img/snow-icon.png";
import Thunderstorm from "../../img/thunderstorm.jpg";

const backgrounds: Record<string, StaticImageData> = {
  Clear: ClearSky,
  Clouds,
  Drizzle: Rain,
  Rain,
  Snow,
  Thunderstorm,
  Mist,
  Smoke: Mist,
  Haze: Mist,
  Fog: Mist,
};

const icons: Record<string, StaticImageData> = {
  Clear: ClearIcon,
  Clouds: CloudIcon,
  Drizzle: RainIcon,
  Rain: RainIcon,
  Snow: SnowIcon,
  Thunderstorm: RainIcon,
  Mist: MistIcon,
  Smoke: MistIcon,
  Haze: MistIcon,
  Fog: MistIcon,
};

export function getWeatherBackground(weatherType: string | undefined) {
  return weatherType ? backgrounds[weatherType] ?? DefaultBackground : DefaultBackground;
}

export function getWeatherIcon(weatherType: string | undefined) {
  return weatherType ? icons[weatherType] ?? ClearIcon : ClearIcon;
}
