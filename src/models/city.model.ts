import { DayForecastModel } from "./dayforecast.model";
import {JsonObject, JsonProperty, JsonConverter, JsonCustomConvert} from "json2typescript";

@JsonConverter
class TemperatureConverter implements JsonCustomConvert<Number> {
    serialize(temperature: Number): any {
        // TODO vers city.main.temp
        //return Math.round(temperature + 273.15);
        return "";
    }
    deserialize(main: any): Number {
        return Math.round(main.temp - 273.15);
    }
}

/*
    Valeurs possibles : partly-sunny, sunny, cloudy, cloudy-night, rainy, thunderstorm
*/
@JsonConverter
class IconConverter implements JsonCustomConvert<String> {
    serialize(icon: String): any {
        // TODO vers city.main.temp
        //return Math.round(temperature + 273.15);
        return "";
    }
    deserialize(weather: any): String {
        var icon = "";
        
        switch (weather[0].icon) {
          case "04n":
            icon = "cloudy-night";
            break;

          case "04d":
            icon = "cloudy";
            break;

          case "10d":
          case "10n":
            icon = "rainy";
            break;
        }
        
        return icon;
    }
}

@JsonObject("CityModel")
export class CityModel {
    @JsonProperty('name', String)
    title: string = undefined;

    @JsonProperty('main', TemperatureConverter)
    temperature: number = undefined;

    @JsonProperty('weather', IconConverter)
    icon: string = undefined;

    forecast: Array<DayForecastModel>;
}
