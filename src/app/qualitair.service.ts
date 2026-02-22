import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class QualitairService {
  private apiUrl = 'http://localhost:8080/airQualities';

  constructor(private http: HttpClient) {}

  getByMunicipalityName(name: string): Observable<AirQualityResponse> {
    return this.http.get<AirQualityResponse>(
      `${this.apiUrl}/municipality/name/${name}`
    );
  }
}

export interface Particle {
  id: number;
  name: string;
  quantity: number;
  unit: string;
}

export interface Municipality {
  id: number;
  name: string;
  insee: number;
  code: number;
}

export interface AirQualityResponse {
  date: string;
  aqi: number;
  municipality: Municipality;
  particles: Particle[];
}
