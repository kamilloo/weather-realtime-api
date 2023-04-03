import {PlaningType} from "../Http/STOMP/PlaningType";
import {Forecast} from "./Forecast";

export interface Planning {
    type: PlaningType,
    saturday: Forecast,
    sunday: Forecast
}