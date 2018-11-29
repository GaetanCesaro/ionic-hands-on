import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs/Observable";

//https://api.openweathermap.org/data/2.5/weather?q=Koumac,nc&appid=846fe87f9f5971ad2a4cfe0cc866636d

@Injectable()
export class CityService {
  private token = "846fe87f9f5971ad2a4cfe0cc866636d";
  private cityServiceUrl = `https://api.openweathermap.org/data/2.5/weather`;

  constructor(private http: HttpClient) {}

  getCity(cityName: string): Observable<any> {
    var cityQuery = `?q=${cityName},nc&appid=${this.token}`;
    return this.http.get(this.cityServiceUrl + cityQuery);
  }
}
