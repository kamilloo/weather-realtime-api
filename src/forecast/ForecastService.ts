import {Forecast} from "../app/models/Forecast";
import {ForecastDate} from "../app/models/DTO/ForecastDate";
import {IForecastApi} from "./contracts/IForecastApi";
import {WeatherApiResponse} from "../app/models/Api/WeatherApiResponse";
import {DailyForecastParser} from "./DailyForecastParser";
import {inject, injectable} from "inversify";
import TYPES from "../type";
import {NotFound} from "../app/models/NotFound";
import appConfig from "../config/app.config";

@injectable()
export class ForecastService {

    constructor(@inject(appConfig.open_meteo == 'live' ? TYPES.ForecastApi : TYPES.FakeApi ) private readonly forecastApi:IForecastApi,
                private readonly forecastApiParser:DailyForecastParser) {
    }

    async today(): Promise<Forecast|NotFound>{
        let forecastRaw:WeatherApiResponse = await this.forecastApi.today();
        return this.parseForecastResponse(forecastRaw);
    }

    // async weekly():{
    //
    // }
    //
    // async monthly():{
    //
    // }

    private parseForecastResponse(forecastRaw: WeatherApiResponse) {
        if (forecastRaw.error) {
            return {
                reason: forecastRaw.error
            } as NotFound
        }
        if (forecastRaw.data) {
            return this.forecastApiParser.parse(forecastRaw.data);
        } else {
            return {
                reason: 'Weather not found'
            } as NotFound
        }
    }


    async daily(forecastDate:ForecastDate): Promise<Forecast|NotFound>{
        let forecastRaw:WeatherApiResponse = await this.forecastApi.getByDate(forecastDate.date);
        return this.parseForecastResponse(forecastRaw);

    }
}
