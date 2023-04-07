import {WeatherApiResponse} from "../../app/models/Api/WeatherApiResponse";
import {IForecastApi} from "../contracts/IForecastApi";
import {injectable} from "inversify";
import axios, {isCancel, AxiosError, AxiosResponse} from 'axios';
import * as querystring from "querystring";

@injectable()
export class ForecastApi implements IForecastApi{
    private url:string = 'https://api.open-meteo.com/v1/forecast';

    async getByDate(date:string):WeatherApiResponse{
        let queryParams= {
            latitude:  52.23,
            longitude:  16.37,
            current_weather:  true,
        };

        let queryRaw = querystring.stringify(queryParams)
        try {
            const response:AxiosResponse = await axios.get(this.url, { params: queryParams })
            return {
                status: response.status,
                data: response.data

            }
        }catch (e) {
            if (e.response) {
                return {
                    status: e.response.status,
                    error: e.response.message,
                    data: [{}]

                }
            } else {
            }
        }
    }
}