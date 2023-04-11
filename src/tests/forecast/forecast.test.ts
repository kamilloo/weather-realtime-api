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


    it('it should call weatcher api and parse response', async () => {

        let forecastDaily:ForecastDate = {date: '2001-01-01'};

        const forecast:Forecast|any = await service.daily(forecastDaily);
        expect(forecast.degrees).to.be.equal(10);
        expect(forecast.filling).to.be.equal("warming");
        expect(forecast.condition).to.be.equal("sunny");
    });

    it('it should return error reason when weather api failed', async () => {

        let forecastDaily:ForecastDate = {date: '2001-01-01'};

        let fakeApiMock:sinon.SinonMock = sinon.mock(forecastApi);
        let apiFailedReason = 'Fake api failed';
        fakeApiMock.expects("getByDate").once().resolves({
                status: 400,
                error: apiFailedReason,
        } as WeatherApiResponse);

        const forecast:NotFound|any = await service.daily(forecastDaily);
        expect(forecast.reason).to.be.equal(apiFailedReason);
        fakeApiMock.verify()
        fakeApiMock.restore()
    });


    it('it should return Not found reason when weather api get Empty Data', async () => {

        let forecastDaily:ForecastDate = {date: '2001-01-01'};

        let fakeApiMock:sinon.SinonMock = sinon.mock(forecastApi);
        let apiFailedReason = 'Fake api failed';
        fakeApiMock.expects("getByDate").once().resolves({
            status: 200,
            data: new Array<any>()
        } as WeatherApiResponse);

        const forecast:NotFound|any = await service.daily(forecastDaily);
        expect(forecast.reason).to.be.equal('weather no found');
        fakeApiMock.verify()
        fakeApiMock.restore()
    });
})