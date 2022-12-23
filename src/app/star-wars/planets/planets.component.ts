import { Component, OnInit } from '@angular/core';
import { PlanetsService } from 'src/app/star-wars/planets.service';

@Component({
  selector: 'app-planets',
  templateUrl: './planets.component.html',
  styleUrls: ['./planets.component.scss'],
})
export class PlanetsComponent implements OnInit {
  public planets = [];

  constructor(private planetsService: PlanetsService) {}

  ngOnInit(): void {
    this.planetsService
      .getPlanets()
      .subscribe((data) => (this.planets = data.results));
  }
}
