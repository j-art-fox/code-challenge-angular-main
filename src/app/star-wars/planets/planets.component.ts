import { Component, OnInit } from '@angular/core';
import { PlanetsService } from 'src/app/star-wars/planets.service';

@Component({
  selector: 'app-planets',
  templateUrl: './planets.component.html',
})
export class PlanetsComponent implements OnInit {
  planetData: any = [];
  requestedPlanetData = {};

  constructor(private planetsService: PlanetsService) {}

  ngOnInit(): void {
    // GETS and SORTS data from API
    this.planetsService.getPlanets().subscribe((Data: any) => {
      // alphabetically sorts planet data by the name of the planet
      // tempData uses dummy data to check sort method
      let tempData: any = [{ name: 'Boyd' }, { name: 'Aaron' }];
      tempData = Data.results;

      for (const iterator of tempData) {
        iterator.active = false;
      }

      tempData.sort(function (a: any, b: any) {
        if (a.name.toLowerCase() < b.name.toLowerCase()) {
          return -1;
        }
        if (a.name.toLowerCase() > b.name.toLowerCase()) {
          return 1;
        }
        return 0;
      });

      return (this.planetData = tempData);
    });
  }
  onPlanetRequested(planetData: { planetName: string }) {
    // this.planetRequestElements.push({ name: planetData.planetName });
    this.requestedPlanetData = { planetData };
    console.log(planetData);
    console.log(this.requestedPlanetData);
  }
}
