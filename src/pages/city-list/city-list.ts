import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { CityModel } from '../../models/city.model';
import { CityDetailsPage } from '../city-details/city-details';

@Component({
  selector: 'page-city-list',
  templateUrl: 'city-list.html',
})
export class CityListPage {
  cities: Array<CityModel>;

  constructor(public navCtrl: NavController, public navParams: NavParams) {

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
        forecast: []
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
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CityListPage');
  }

  itemTapped(event, city) {
    this.navCtrl.push(CityDetailsPage, {
      city: city
    });
  }

}
