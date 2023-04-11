import {WeatherApiResponse} from "../../app/models/Api/WeatherApiResponse";
import {IForecastApi} from "../contracts/IForecastApi";
import {injectable} from "inversify";
import {WeatherApiData} from "../../app/models/Api/WeatherApiData";
import {WeatherApiDailyForecast} from "../../app/models/Api/WeatherApiDailyForecast";

@injectable()
export class FakeApi implements IForecastApi {
    getByDate(date:string):Promise<WeatherApiResponse>{
        return Promise.resolve({
            status: 200,
            error: undefined,
            data: [
                {
                    "latitude": 52.22,
                    "longitude": 16.38,
                    "generationtime_ms": 0.2840757369995117,
                    "utc_offset_seconds": 0,
                    "timezone": "GMT",
                    "timezone_abbreviation": "GMT",
                    "elevation": 83.0,
                    "current_weather": {
                        "temperature": 11.1,
                        "windspeed": 21.7,
                        "winddirection": 238.0,
                        "weathercode": 3,
                        "is_day": 1,
                        "time": "2023-04-11T10:00"
                    } as WeatherApiDailyForecast
                } as WeatherApiData
            ]
        })
    }
}