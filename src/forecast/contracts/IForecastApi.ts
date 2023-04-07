import {WeatherApiResponse} from "../../app/models/Api/WeatherApiResponse";

export interface IForecastApi {
    getByDate(date:string):WeatherApiResponse;
}