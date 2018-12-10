import { ForecastModel } from "./forecast.model";
import { JsonObject, JsonProperty } from "json2typescript";
import { TemperatureConverter, IconConverter } from "./json.converters";

@JsonObject("CityModel")
export class CityModel {
    @JsonProperty('name', String)
    title: string = undefined;

    @JsonProperty('main', TemperatureConverter)
    temperature: number = undefined;

    @JsonProperty('weather', IconConverter)
    icon: string = undefined;

    forecasts: Array<ForecastModel>;
}
