import {WeatherApiResponse} from "../../app/models/Api/WeatherApiResponse";

export interface IForecastApi {
    getByDate(date:string):Promise<WeatherApiResponse>;
    today():Promise<WeatherApiResponse>;
}