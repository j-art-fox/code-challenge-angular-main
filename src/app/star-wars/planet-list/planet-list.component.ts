import { Component, OnInit, Input } from '@angular/core';
import { PlanetsService } from '../planets.service';

@Component({
  selector: 'app-planet-list',
  templateUrl: './planet-list.component.html',
})
export class PlanetListComponent implements OnInit {
  // inputs data from the planets.component
  @Input() planetData: any = [];
  @Input('requestedPlanet') element: any = {};

  // random example of string Interpolation
  title = 'planets';
  planetActivated = false;
  constructor(private planetsService: PlanetsService) {}
  ngOnInit(): void {}
}
