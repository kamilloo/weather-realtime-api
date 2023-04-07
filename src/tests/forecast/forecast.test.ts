import "reflect-metadata";
import {ForecastService} from "../../forecast/ForecastService";
import {ForecastDate} from "../../app/models/DTO/ForecastDate";
import {Forecast} from "../../app/models/Forecast";
import Chai from "chai";
import {IForecastApi} from "../../forecast/contracts/IForecastApi";
import {DailyForecastParser} from "../../forecast/DailyForecastParser";
import {FakeApi} from "../../forecast/fake/FakeApi";

describe('Forecast Service', () => {
    let service:ForecastService;

    let forecastApi: IForecastApi;
    let forecastParser:DailyForecastParser

    beforeEach(() => {
        forecastApi = new FakeApi();
        forecastParser = new DailyForecastParser();
        service = new ForecastService(forecastApi, forecastParser)
    });


    it('it should instance', ()=> {} )


    it('it should call weatcher api and parse response', function () {

        let forecastDaily:ForecastDate = {date: '2001-01-01'};

        const forecast:Forecast = service.daily(forecastDaily);

        Chai.expect(forecast.degrees).to.be.equal(10);
        Chai.expect(forecast.filling).to.be.equal("warming");
        Chai.expect(forecast.condition).to.be.equal("sunny");
    });
})