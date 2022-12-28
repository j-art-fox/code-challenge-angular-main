import { Component, OnInit, Input } from '@angular/core';
import { PlanetsService } from 'src/app/star-wars/planets.service';

@Component({
  selector: 'app-planet-list',
  templateUrl: './planet-list.component.html',
})
export class PlanetListComponent implements OnInit {
  // inputs data from the planets.component
  @Input() planetData: any = [];
  @Input() peopleData: any = [];
  title = 'planets';

  constructor(private planetsService: PlanetsService) {
    console.log(this.planetData);
  }

  ngOnInit(): void {}
}
