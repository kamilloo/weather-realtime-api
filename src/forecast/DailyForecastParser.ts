import {Forecast} from "../app/models/Forecast";
import {ForecastDate} from "../app/models/DTO/ForecastDate";
import {IForecastApi} from "./contracts/IForecastApi";
import {WeatherApiResponse} from "../app/models/Api/WeatherApiResponse";
import {WeatherApiDailyForecast} from "../app/models/Api/WeatherApiDailyForecast";
import {WeatherApiData} from "../app/models/Api/WeatherApiData";
import {WeatherCondition} from "./parsers/WeatherCondition";
import {WeatherFilling} from "./parsers/WeatherFilling";

export class DailyForecastParser {
    constructor() {

    }
    parse(dailyForecasts:WeatherApiData): Forecast{

        return {
            degrees: dailyForecasts.current_weather.temperature,
            filling: new WeatherFilling().parse(dailyForecasts.current_weather.temperature),
            condition: new WeatherCondition().parse(dailyForecasts.current_weather.weathercode)
        } as Forecast
    }
}