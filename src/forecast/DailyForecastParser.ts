import {Forecast} from "../app/models/Forecast";
import {ForecastDate} from "../app/models/DTO/ForecastDate";
import {IForecastApi} from "./contracts/IForecastApi";
import {WeatherApiResponse} from "../app/models/Api/WeatherApiResponse";
import {DailyForecast} from "../app/models/Api/DailyForecast";

export class DailyForecastParser {
    constructor() {

    }
    parse(dailyForecasts:DailyForecast[]): Forecast{

        return {
            degrees: 10,
            filling: 'warming',
            condition: 'sunny'
        } as Forecast
    }
}