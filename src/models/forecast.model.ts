import { Time } from "@angular/common";
import { JsonObject, JsonProperty } from "json2typescript";
import { IconConverter } from "./json.converters";

@JsonObject("ForecastModel")
export class ForecastModel {
    day: string = undefined;
    date: Date = undefined;
    time: Time = undefined;
    temperature: number = undefined;

    @JsonProperty('weather', IconConverter)
    icon: string = undefined;
}