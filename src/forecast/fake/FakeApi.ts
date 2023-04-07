import {WeatherApiResponse} from "../../app/models/Api/WeatherApiResponse";
import {IForecastApi} from "../contracts/IForecastApi";
import {injectable} from "inversify";

@injectable()
export class FakeApi implements IForecastApi {
    getByDate(date:string):WeatherApiResponse{
        return {
            status: 200,
            error: undefined,
            data: [
                {
                    date: "2001",
                    degrees: 10,
                }
            ]

        }
    }
}