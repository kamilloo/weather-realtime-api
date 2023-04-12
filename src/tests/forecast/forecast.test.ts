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
import {WeatherFilling} from "../../forecast/parsers/WeatherFilling";
import {WeatherCondition} from "../../forecast/parsers/WeatherCondition";
import {FillingType} from "../../forecast/descriptors/FillingType";
import {ConditionType} from "../../forecast/descriptors/ConditionType";

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
        let forecastParserMock: sinon.SinonMock = sinon.mock(forecastParser)
        forecastParserMock.expects("parse").once().returns({
            degrees: 10,
            filling: FillingType.WARM,
            condition: ConditionType.SUN
        } as Forecast)

        const forecast:Forecast|any = await service.daily(forecastDaily);
        expect(forecast.degrees).to.be.equal(10);
        expect(forecast.filling).to.be.equal(FillingType.WARM);
        expect(forecast.condition).to.be.equal(ConditionType.SUN);
        forecastParserMock.verify()
        forecastParserMock.restore()
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
        expect(forecast.reason).to.be.equal('Weather not found');
        fakeApiMock.verify()
        fakeApiMock.restore()
    });
})