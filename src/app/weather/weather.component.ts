import { Component, OnInit } from '@angular/core';
import { WeatherService } from '../weather.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faSun,
  faCloud,
  faCloudRain,
  faBolt,
  faSnowflake,
  faSmog,
  faCloudShowersHeavy,
  faCloudMeatball,
  faCloudSun,
} from '@fortawesome/free-solid-svg-icons';
import { SubscribeManagementComponent } from '../subscribe-management/subscribe-management.component';

@Component({
  selector: 'app-weather',
  standalone: true,
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css'],
  imports: [FormsModule, CommonModule, FontAwesomeModule],
})
export class WeatherComponent
  extends SubscribeManagementComponent
  implements OnInit
{
  weatherData: any;
  research: string = '';

  faSun = faSun;
  faCloud = faCloud;
  faCloudRain = faCloudRain;
  faBolt = faBolt;
  faSnowflake = faSnowflake;
  faSmog = faSmog;
  faCloudShowersHeavy = faCloudShowersHeavy;
  faCloudMeatball = faCloudMeatball;
  faCloudSun = faCloudSun;

  constructor(private weatherService: WeatherService) {
    super();
  }

  ngOnInit(): void {}

  searchWeather() {
    if (this.research) {
      const sub = this.weatherService
        .getWeatherByMunicipalityName(this.research)
        .subscribe((data) => (this.weatherData = data));

      this.addSubscription(sub);
    }
  }

  getWeatherIcon(weatherType: string): any {
    if (/ensoleillé|sunny/i.test(weatherType)) {
      return this.faSun; // Icône pour Ensoleillé
    } else if (/nuageux|cloudy|overcast/i.test(weatherType)) {
      return this.faCloudSun; // Icône pour Nuageux
    } else if (/pluie|rain|drizzle/i.test(weatherType)) {
      return this.faCloudRain; // Icône pour Pluie
    } else if (/orage|thunderstorm/i.test(weatherType)) {
      return this.faBolt; // Icône pour Orage
    } else if (/neige|snow/i.test(weatherType)) {
      return this.faSnowflake; // Icône pour Neige
    } else if (/brouillard|fog/i.test(weatherType)) {
      return this.faSmog; // Icône pour Brouillard
    } else if (/grêle|hail/i.test(weatherType)) {
      return this.faCloudMeatball; // Icône pour Grêle
    } else {
      return this.faCloud; // Icône par défaut
    }
  }
}
