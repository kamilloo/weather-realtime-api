import {WeatherApiResponse} from "../../app/models/Api/WeatherApiResponse";
import {IForecastApi} from "../contracts/IForecastApi";
import {injectable} from "inversify";
import axios, {isCancel, AxiosError, AxiosResponse, isAxiosError} from 'axios';
import * as querystring from "querystring";

@injectable()
export class ForecastApi implements IForecastApi{
    private url:string = 'https://api.open-meteo.com/v1/forecast';

    async getByDate(date:string):Promise<WeatherApiResponse>{
        let queryParams= {
            latitude:  52.23,
            longitude:  16.37,
            current_weather:  true,
        };

        let queryRaw = querystring.stringify(queryParams)
        try {
            const response:AxiosResponse = await axios.get(this.url, { params: queryParams })
            this.validateResponse(response)
            return {
                status: response.status,
                data: response.data

            }
        }catch (error) {
            if (this.axiosError(error)) {
                return {
                    data: [{}],
                    error: error.message,
                    status: error.status ?? 400
                }
            } else {
                return {
                    data: [{}],
                    error: 'Unknown Error',
                    status: 400
                }
            }
        }
    }

    private axiosError(error:any) :error is AxiosError{
        return error.isAxiosError
    }

    private validateResponse(response: AxiosResponse) {

    }

    today(): Promise<WeatherApiResponse> {
        const today = new Date(Date.now())
        return this.getByDate(today.toDateString());
    }
}
