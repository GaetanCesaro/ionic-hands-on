import { Time } from "@angular/common";
import { JsonObject, JsonProperty } from "json2typescript";
import { TimestampToDayConverter, TimestampToHourConverter, TimestampToDateConverter, TemperatureConverter, IconConverter } from "./json.converters";

@JsonObject("ForecastModel")
export class ForecastModel {
    @JsonProperty('dt', TimestampToDayConverter)
    day: string = undefined;

    @JsonProperty('dt', TimestampToDateConverter)
    date: string = undefined;

    @JsonProperty('dt', TimestampToHourConverter)
    time: string = undefined;
    
    @JsonProperty('main', TemperatureConverter)
    temperature: number = undefined;

    @JsonProperty('weather', IconConverter)
    icon: string = undefined;
}