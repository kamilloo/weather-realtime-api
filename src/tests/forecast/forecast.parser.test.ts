import "reflect-metadata";
import {ForecastService} from "../../forecast/ForecastService";
import {ForecastDate} from "../../app/models/DTO/ForecastDate";
import {Forecast} from "../../app/models/Forecast";
import Chai, {expect} from "chai";
import {IForecastApi} from "../../forecast/contracts/IForecastApi";
import {DailyForecastParser} from "../../forecast/DailyForecastParser";
import {FakeApi} from "../../forecast/fake/FakeApi";
import {NotFound} from "../../app/models/NotFound";
import sinon from "sinon";
import {ForecastApi} from "../../forecast/api/ForecastApi";
import {WeatherApiResponse} from "../../app/models/Api/WeatherApiResponse";
import {WeatherApiCurrentWeather} from "../../app/models/Api/WeatherApiCurrentWeather";
import {WeatherApiData} from "../../app/models/Api/WeatherApiData";
import {FillingType} from "../../forecast/descriptors/FillingType";
import {ConditionType} from "../../forecast/descriptors/ConditionType";

describe('Forecast Parser', () => {

    let forecastParser:DailyForecastParser

    beforeEach(() => {
        forecastParser = new DailyForecastParser();
    });


    it('parse api response successful',  () => {

        let temperature = 11.1;
        let weathercode = 3;
        let forecastDaily:WeatherApiData = {
            "latitude": 52.22,
            "longitude": 16.38,
            "generationtime_ms": 0.2840757369995117,
            "utc_offset_seconds": 0,
            "timezone": "GMT",
            "timezone_abbreviation": "GMT",
            "elevation": 83.0,
            "current_weather": {
                "temperature": temperature,
                "windspeed": 21.7,
                "winddirection": 238.0,
                "weathercode": weathercode,
                "is_day": 1,
                "time": "2023-04-11T10:00"
            } as WeatherApiCurrentWeather
        } as WeatherApiData;

        const forecast:Forecast = forecastParser.parse(forecastDaily);
        expect(forecast.degrees).to.be.equal(temperature);
        expect(forecast.filling).to.be.equal(FillingType.MODERATE);
        expect(forecast.condition).to.be.equal(ConditionType.SUN);
    });

})