import { Component, OnInit } from '@angular/core';
import { PlanetsService } from 'src/app/star-wars/planets.service';

@Component({
  selector: 'app-planets',
  templateUrl: './planets.component.html',
})
export class PlanetsComponent implements OnInit {
  planetData: any = [];
  requestedPlanetData: any = {};
  activationRequest: boolean = false;

  constructor(private planetsService: PlanetsService) {}

  // GETS and SORTS data from API ON INIT
  ngOnInit(): void {
    this.planetsService.getPlanets().subscribe((Data: any) => {
      let tempData: any = [{ name: 'Boyd' }, { name: 'Aaron' }];
      tempData = Data.results;
      // SORT FUNCTION THAT ALPHABATIZES DATA
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

  onPlanetRequested(planetData: any) {
    this.requestedPlanetData = planetData;
  }

  onActivationRequest(data: boolean) {
    this.activationRequest = data;
  }
}
