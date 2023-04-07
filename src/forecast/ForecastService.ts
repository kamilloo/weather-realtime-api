import {Forecast} from "../app/models/Forecast";
import {ForecastDate} from "../app/models/DTO/ForecastDate";
import {ForecastApi} from "./contracts/ForecastApi";
import {WeatherApiResponse} from "../app/models/Api/WeatherApiResponse";
import {DailyForecastParser} from "./DailyForecastParser";

export class ForecastService {

    constructor(private readonly forecastApi:ForecastApi,
                private readonly forecastApiParser:DailyForecastParser) {

    }

    daily(forecastDate:ForecastDate): Forecast{

        let forecastRaw:WeatherApiResponse = this.forecastApi.getByDate(forecastDate.date);
        return this.forecastApiParser.parse(forecastRaw);

        //parse daily
        //get from api
        //parse api
        //compute logic/map to forecast interface
        //return data
    }
}