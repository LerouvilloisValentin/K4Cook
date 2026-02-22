import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  private apiUrl = 'http://localhost:8080/weather';

  constructor(private http: HttpClient) {}

  getWeatherData(): Observable<Weather[]> {
    return this.http.get<Weather[]>(this.apiUrl);
  }

  getWeatherById(id: number): Observable<Weather> {
    return this.http.get<Weather>(`${this.apiUrl}/${id}`);
  }

  getWeatherByMunicipalityId(municipalityId: number): Observable<Weather> {
    return this.http.get<Weather>(
      `${this.apiUrl}/municipality/${municipalityId}`
    );
  }

  getWeatherByMunicipalityName(municipalityName: string): Observable<Weather> {
    return this.http.get<Weather>(
      `${this.apiUrl}/municipality/name/${municipalityName}`
    );
  }
}

export interface Weather {
  atmophericPressure: number;
  humidity: number;
  temperature: number;
  date: Date;
  wind: number;
  dirWind: number;
  probaRain: number;
  type: string;
}
