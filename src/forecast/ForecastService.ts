import {Forecast} from "../app/models/Forecast";
import {ForecastDate} from "../app/models/DTO/ForecastDate";
import {IForecastApi} from "./contracts/IForecastApi";
import {WeatherApiResponse} from "../app/models/Api/WeatherApiResponse";
import {DailyForecastParser} from "./DailyForecastParser";
import {inject, injectable} from "inversify";
import TYPES from "../type";
import {NotFound} from "../app/models/NotFound";

@injectable()
export class ForecastService {

    constructor(@inject(TYPES.FakeApi) private readonly forecastApi:IForecastApi,
                private readonly forecastApiParser:DailyForecastParser) {
    }

    async daily(forecastDate:ForecastDate): Promise<Forecast|NotFound>{
        let forecastRaw:WeatherApiResponse = await this.forecastApi.getByDate(forecastDate.date);
        if (forecastRaw.error){
            return {
                reason: forecastRaw.error
            }as NotFound
        }
        if (forecastRaw.data.length){
            return this.forecastApiParser.parse(forecastRaw.data[0]);
        }else {
            return {
                reason: 'weather no found'
            }as NotFound
        }

        //parse daily
        //get from api
        //parse api
        //compute logic/map to forecast interface
        //return data
    }
}