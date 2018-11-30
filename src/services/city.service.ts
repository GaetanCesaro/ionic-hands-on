import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Observable } from "rxjs/Observable";
import { CityModel } from "../models/city.model";

//https://api.openweathermap.org/data/2.5/weather?q=Koumac,nc&appid=846fe87f9f5971ad2a4cfe0cc866636d

@Injectable()
export class CityService {
  private token = "846fe87f9f5971ad2a4cfe0cc866636d";
  private cityServiceUrl = `https://api.openweathermap.org/data/2.5/weather`;

  constructor(private http: HttpClient) {}

  getCity(cityName: string): Promise<CityModel> {
    var cityQuery = `?q=${cityName},nc&appid=${this.token}`;
    return this.http
      .get(this.cityServiceUrl + cityQuery)
      .toPromise<any>()
      .then(city => {
        console.log(city);

        var icon = "";
        switch (city.weather[0].icon) {
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

        var cityModel = new CityModel();

        cityModel.title = city.name;
        cityModel.temperature = Math.round(city.main.temp - 273.15);
        cityModel.icon = icon;

        return cityModel;
      })
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    return Promise.reject(error.message || error);
  }
}
