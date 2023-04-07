import {Forecast} from "../app/models/Forecast";
import {ForecastDate} from "../app/models/DTO/ForecastDate";
import {IForecastApi} from "./contracts/IForecastApi";
import {WeatherApiResponse} from "../app/models/Api/WeatherApiResponse";
import {DailyForecastParser} from "./DailyForecastParser";
import {inject, injectable} from "inversify";
import TYPES from "../type";

@injectable()
export class ForecastService {

    constructor(@inject(TYPES.FakeApi) private readonly forecastApi:IForecastApi,
                private readonly forecastApiParser:DailyForecastParser) {

    }

    daily(forecastDate:ForecastDate): Forecast{
        let forecastRaw:WeatherApiResponse = this.forecastApi.getByDate(forecastDate.date);
        return this.forecastApiParser.parse([]);

        //parse daily
        //get from api
        //parse api
        //compute logic/map to forecast interface
        //return data
    }
}