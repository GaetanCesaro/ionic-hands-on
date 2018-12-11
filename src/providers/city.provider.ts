import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { CityModel } from "../models/city.model";
import { JsonConvert, OperationMode, ValueCheckingMode } from "json2typescript";
import { GlobalErrorHandler } from "../app/error-handler";
import { ForecastModel } from "../models/forecast.model";

@Injectable()
export class CityService {
  //https://api.openweathermap.org/data/2.5/weather?q=Koumac,nc&appid=846fe87f9f5971ad2a4cfe0cc866636d
  private token = "846fe87f9f5971ad2a4cfe0cc866636d";
  private cityServiceUrl = `https://api.openweathermap.org/data/2.5/`; // https://api.openweathermap.org/data/2.5/forecast?q=Noumea,nc&appid=846fe87f9f5971ad2a4cfe0cc866636d
  private jsonConvert = new JsonConvert();

  constructor(
    private http: HttpClient,
    private globalErrorHandler: GlobalErrorHandler
  ) {
    this.jsonConvert.operationMode = OperationMode.ENABLE; // print some debug data
    this.jsonConvert.ignorePrimitiveChecks = false; // don't allow assigning number to string etc.
    this.jsonConvert.valueCheckingMode = ValueCheckingMode.DISALLOW_NULL; // never allow null
  }

  /**
   * Retourne une ville à partir de son nom
   * @param cityName 
   */
  getCityByName(cityName: string): Promise<CityModel> {
    var apiMethod = 'weather';
    var cityQuery = `?q=${cityName},nc&appid=${this.token}`;
    return this.http
      .get(this.cityServiceUrl + apiMethod + cityQuery)
      .toPromise<any>()
      .then(city => {
        let cityModel: CityModel;
        
        try {
          // GET sur Weather
          cityModel = this.jsonConvert.deserialize(city, CityModel);

          // GET sur Forecast
          this.getForecastByName(cityName).then(forecasts => {
            cityModel.forecasts = forecasts;
          });
        } catch (e) {
          this.globalErrorHandler.handlePromiseError(e);
        } 

        return cityModel;
      });
  }

  /**
   * Retourne une ville à partir de son nom
   * @param cityName 
   */
  getForecastByName(cityName: String): Promise<ForecastModel[]> {
    var apiMethod = 'forecast';
    var cityQuery = `?q=${cityName},nc&appid=${this.token}`;

    return this.http
      .get(this.cityServiceUrl + apiMethod + cityQuery)
      .toPromise<any>()
      .then(forecasts => {
        let forecastsModels = [];

        try {
          forecasts.list.forEach(forecast => {
            let forecastModel: ForecastModel;
            forecastModel = this.jsonConvert.deserialize(forecast, ForecastModel); 
            forecastsModels.push(forecastModel);
          });
        } catch (e) {
          this.globalErrorHandler.handlePromiseError(e);
        }
        
        return forecastsModels;
      });
  }
}
