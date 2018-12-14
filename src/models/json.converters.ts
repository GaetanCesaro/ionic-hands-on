import { JsonConverter, JsonCustomConvert, Any } from "json2typescript";

var jours = ['Dimanche','Lundi','Mardi','Mercredi','Jeudi','Vendredi','Samedi'];

@JsonConverter
export class TimestampToDayConverter implements JsonCustomConvert<string> {
    serialize(date: string): number {
        // TODO retirer dans ce sens
        return 0;
    }
    deserialize(dt: number): string {
        var options = {  weekday: 'long' };
        let day = new Date(dt*1000).toLocaleDateString('fr-FR', options);
        return day.charAt(0).toUpperCase() + day.slice(1);
    }
}

@JsonConverter
export class TimestampToDateConverter implements JsonCustomConvert<string> {
    serialize(date: string): number {
        // TODO retirer dans ce sens
        return 0;
    }
    deserialize(dt: number): string {
        var options = {  day: 'numeric', month: 'short' };
        return new Date(dt*1000).toLocaleDateString('fr-FR', options);
    }
}

@JsonConverter
export class TimestampToHourConverter implements JsonCustomConvert<string> {
    serialize(date: string): number {
        // TODO retirer dans ce sens
        return 0;
    }
    deserialize(dt: number): string {
        var options = {  hour: '2-digit', minute: '2-digit', hour12: false };
        return new Date(dt*1000).toLocaleTimeString('fr-FR', options);
    }
}

@JsonConverter
export class TemperatureConverter implements JsonCustomConvert<number> {
    serialize(temperature: number): any {
        // TODO
        /*
        main.temp = Math.round(temperature + 273.15);
        return main;
        */
    }
    deserialize(main: any): number {
        return Math.round(main.temp - 273.15);
    }
}

@JsonConverter
export class IconConverter implements JsonCustomConvert<String> {
    serialize(icon: string): any {
        // TODO vers weather[0].icon
        return "";
    }
    deserialize(weather: any): String {
        var icon = "";

        switch (weather[0].icon) {
            case "01d":
                icon = "day-sunny";         // sunny
                break;

            case "01n":
                icon = "night-moon";        // moon
                break;

            case "02d":
            case "03d":
            case "04d":
                icon = "day-partly-cloudy";  // partly-sunny
                break;

            case "02n":
            case "03n":
            case "04n":
                icon = "night-partly-cloudy";    // cloudy-night
                break;

            case "10d":
                icon = "day-rain"; // rainy
                break;

            case "10n":
                icon = "night-rain"; // rainy
                break;

            case "xxx":
                icon = "thunderstorm";
                break;

            default:
                console.log("UNMAPPED ICON ", weather);
                break;
        }

        return "pic40 " + icon;
    }
}