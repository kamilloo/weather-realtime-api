import {ConditionType} from "../descriptors/ConditionType";

export class WeatherCondition {

    //     0 	Clear sky
    //     1, 2, 3 	Mainly clear, partly cloudy, and overcast
    //     45, 48 	Fog and depositing rime fog
    //     51, 53, 55 	Drizzle: Light, moderate, and dense intensity
    // 56, 57 	Freezing Drizzle: Light and dense intensity
    // 61, 63, 65 	Rain: Slight, moderate and heavy intensity
    // 66, 67 	Freezing Rain: Light and heavy intensity
    // 71, 73, 75 	Snow fall: Slight, moderate, and heavy intensity
    // 77 	Snow grains
    // 80, 81, 82 	Rain showers: Slight, moderate, and violent
    // 85, 86 	Snow showers slight and heavy
    // 95 * 	Thunderstorm: Slight or moderate
    // 96 Thunderstorm with slight and heavy hail
    // 99 Thunderstorm with slight and heavy hail

    parse(weatherCode: number):ConditionType
    {
        const code = Math.floor((weatherCode / 10));
        if ([0, 1, 2, 3].find((value) => value == code) !== undefined){
            return ConditionType.SUN
        }
        if (code == 4){
            return ConditionType.FOG;
        }
        if (code == 5){
            return ConditionType.DRIZZLING
        }
        if ([6, 8].find((value) => value == code)){
            return ConditionType.RAINING
        }
        if (code == 7){
            return ConditionType.SNOW
        }
        if (code == 9){
            return ConditionType.THUNDERSTORM
        }

        return ConditionType.UNKNOWN

    }
}