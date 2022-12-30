import { Component, OnInit, Input } from '@angular/core';
import { PlanetsService } from '../planets.service';

@Component({
  selector: 'app-planet-list',
  templateUrl: './planet-list.component.html',
})
export class PlanetListComponent implements OnInit {
  // inputs data from the planets.component
  @Input() planetData: any = [];
  @Input('requestedPlanet') element!: { planetName: string };
  @Input() planetActivated: boolean = false;
  fullList: boolean = false;
  viewButton: string = 'View All Planets';

  // random example of string Interpolation

  constructor(private planetsService: PlanetsService) {
    console.log(this.element);
  }
  ngOnInit(): void {}

  activatePlanet() {
    this.planetActivated = true;
  }
  showFullList() {
    this.fullList = !this.fullList;
  }
}
