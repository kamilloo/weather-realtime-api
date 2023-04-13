import {FakeApi} from "./forecast/fake/FakeApi";
import {ForecastApi} from "./forecast/api/ForecastApi";

const TYPES = {
    FakeApi: Symbol('FakeApi'),
    ForecastApi: Symbol('ForecastApi'),
};

export default TYPES;