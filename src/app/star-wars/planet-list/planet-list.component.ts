import { Component, DoCheck, Input } from '@angular/core';
import { PlanetsService } from '../planets.service';

@Component({
  selector: 'app-planet-list',
  templateUrl: './planet-list.component.html',
})
export class PlanetListComponent implements DoCheck {
  // inputs data from the planets.component
  @Input() planetData: any = [];
  @Input('requestedPlanet') element!: any;
  @Input() planetActivated: boolean = false;
  fullList: boolean = false;
  viewButton: string = 'View All Planets';

  dropDownDisplayed: boolean = true;

  // random example of string Interpolation

  constructor(private planetsService: PlanetsService) {
    console.log(this.element);
  }
  ngDoCheck(): void {}

  activatePlanet() {
    this.planetActivated = true;
  }
  showFullList() {
    if (this.viewButton === 'View All Planets') {
      this.viewButton = 'Hide All Planets';
    } else {
      this.viewButton = 'View All Planets';
    }
    this.fullList = !this.fullList;
  }
  displayDropdown() {
    this.dropDownDisplayed = !this.dropDownDisplayed;
  }
}
