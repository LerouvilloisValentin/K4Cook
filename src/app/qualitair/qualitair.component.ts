import { Component, OnInit } from '@angular/core';
import {
  QualitairService,
  AirQualityResponse,
  Particle,
} from '../qualitair.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SubscribeManagementComponent } from '../subscribe-management/subscribe-management.component';

@Component({
  selector: 'app-qualitair',
  standalone: true,
  imports: [FormsModule, CommonModule, FontAwesomeModule],
  templateUrl: './qualitair.component.html',
  styleUrl: './qualitair.component.css',
})
export class QualitairComponent
  extends SubscribeManagementComponent
  implements OnInit
{
  airQuality: AirQualityResponse | null = null;
  research: string = '';

  constructor(private qualitairService: QualitairService) {
    super();
  }

  ngOnInit(): void {}

  loadAirQualities(): void {
    if (this.research) {
      const sub = this.qualitairService
        .getByMunicipalityName(this.research)
        .subscribe((data: AirQualityResponse) => {
          this.airQuality = data;
        });

      this.addSubscription(sub);
    }
  }

  getParticlePercentage(quantity: number): number {
    const maxQuantity = this.getMaxQuantity();
    return (quantity / maxQuantity) * 100;
  }

  getMaxQuantity(): number {
    if (!this.airQuality || !this.airQuality.particles.length) return 1;
    return Math.max(
      ...this.airQuality.particles.map((p: Particle) => p.quantity)
    );
  }

  getAqiColor(aqi: number): string {
    if (aqi <= 50) {
      return 'bg-green-500';
    } else if (aqi <= 100) {
      return 'bg-yellow-500';
    } else if (aqi <= 150) {
      return 'bg-orange-500';
    } else if (aqi <= 200) {
      return 'bg-red-500';
    } else if (aqi <= 300) {
      return 'bg-purple-500';
    } else {
      return 'bg-gray-800';
    }
  }

  private pollutants = ['no2', 'o3', 'pm10', 'pm25', 'so2'];

  getPollutants(): Particle[] {
    if (!this.airQuality || !this.airQuality.particles) return [];

    const particles = this.airQuality.particles.slice(0, 5);

    if (particles.length === 5 && particles[4].name === 'so2') {
      return particles;
    } else {
      return particles.slice(0, 4);
    }
  }

  getNonPollutants(): Particle[] {
    if (!this.airQuality) {
      return [];
    }

    return this.airQuality.particles.filter(
      (particle: Particle) => !this.pollutants.includes(particle.name)
    );
  }
}
