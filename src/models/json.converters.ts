import { JsonConverter, JsonCustomConvert, Any } from "json2typescript";

@JsonConverter
export class TemperatureConverter implements JsonCustomConvert<Number> {
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
export class IconConverter implements JsonCustomConvert<String> {
    serialize(icon: String): any {
        // TODO vers city.main.temp
        //return Math.round(temperature + 273.15);
        return "";
    }
    deserialize(weather: any): String {
        var icon = "";
        
        switch (weather[0].icon) {
          case "02d":
            icon = "sunny";
            break;

          case "03n":
            icon = "night";
            break;

          case "03d":
            icon = "sunny";
            break;

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
        
          default:
            console.log("UNMAPPED ICON ", weather[0].icon);
            break;
        }
        
        return icon;
    }
}