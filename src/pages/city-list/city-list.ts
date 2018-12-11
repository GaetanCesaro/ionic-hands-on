import { Component } from "@angular/core";
import { NavController, NavParams } from "ionic-angular";
import { CityModel } from "../../models/city.model";
import { CityDetailsPage } from "../city-details/city-details";
import { CityService } from "../../providers/city.provider";

@Component({
  selector: "page-city-list",
  templateUrl: "city-list.html"
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
    console.log("ionViewDidLoad CityListPage");
  }

  itemTapped(event, city) {
    this.navCtrl.push(CityDetailsPage, {
      city: city
    });
  }

  initCities() {
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

    this.addCity("Nouméa");
    this.addCity("Dumbéa");
    this.addCity("Mont-Dore");
    this.addCity("Païta");
    this.addCity("Koné");
    this.addCity("Koumac");

    // Erreur
    this.addCity("Paris");
  }

  private addCity(cityName: string) {
    this.cityService
      .getCityByName(cityName)
      .then(city => {
        this.cities.push(city);
      }
      );
  }

}
