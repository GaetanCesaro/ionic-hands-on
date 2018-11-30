import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { CityModel } from '../../models/city.model';
import { CityDetailsPage } from '../city-details/city-details';
import { CityService } from '../../services/city.service';

@Component({
  selector: 'page-city-list',
  templateUrl: 'city-list.html',
})
export class CityListPage {
  cities: Array<CityModel>;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public cityService: CityService
  ) {
    this.initCities();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CityListPage');
  }

  itemTapped(event, city) {
    this.navCtrl.push(CityDetailsPage, {
      city: city
    });
  }

  initCities(){
    /*
    this.cities = [
      {
        title: "Nouméa",
        temperature: 28,
        icon: "sunny",
        forecast: []
      },
      {
        title: "Koné",
        temperature: 25,
        icon: "partly-sunny",
        forecast: [
          {
            day: "Vendredi",
            temperature: 28,
            icon: "sunny"
          },
          {
            day: "Samedi",
            temperature: 30,
            icon: "sunny"
          },
          {
            day: "Dimanche",
            temperature: 26,
            icon: "cloudy"
          }
        ]
      }
    ];

    this.cities.push(
        {
          title: "Koumac",
          temperature: 23,
          icon: "cloudy",
          forecast: []
        }
    );
    */

    this.cities = [];

    this.cityService.getCity("Nouméa").toPromise().then(city => this.addCity(city));
    this.cityService.getCity("Poum").toPromise().then(city => this.addCity(city));
    this.cityService.getCity("Koné").toPromise().then(city => this.addCity(city));
    this.cityService.getCity("Koumac").toPromise().then(city => this.addCity(city));
  }

  addCity(city){
    console.log(city);
    var icon = "";
    switch (city.weather[0].icon){
      case "04d":
        icon = "cloudy";
        break;
      
      case "10d":
        icon = "rainy";
        break;
    }

    var cityModel = new CityModel();
    
    cityModel.title = city.name;
    cityModel.temperature = Math.round(city.main.temp - 273.15);
    cityModel.icon = icon;

    console.log(cityModel);

    this.cities.push(cityModel);
  }

}
