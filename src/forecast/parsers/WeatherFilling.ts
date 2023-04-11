import {FillingType} from "../descriptors/FillingType";

export class WeatherFilling {

    parse(temperature: number):FillingType
    {
        if (temperature < 0){
            return FillingType.FREEZING
        }
        if (temperature < 10){
            return FillingType.COLD;
        }
        if (temperature < 20){
            return FillingType.MODERATE
        }
        if (temperature < 30){
            return FillingType.WARM;
        }
        return FillingType.HOT

    }
}