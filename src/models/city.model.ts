import { DayForecastModel } from "./dayforecast.model";

/*
    partly-sunny
    sunny
    cloudy
    cloudy-night
    rainy
    thunderstorm
*/

export class CityModel {
    title: string;
    temperature: number;
    icon: string;
    forecast: Array<DayForecastModel>;
}

