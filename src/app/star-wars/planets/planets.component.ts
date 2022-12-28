import { Component, OnInit } from '@angular/core';
import { PlanetsService } from 'src/app/star-wars/planets.service';

@Component({
  selector: 'app-planets',
  templateUrl: './planets.component.html',
  styleUrls: ['./planets.component.scss'],
})
export class PlanetsComponent implements OnInit {
  planetData: any = [];

  constructor(private planetsService: PlanetsService) {}

  ngOnInit(): void {
    // GETS and SORTS data from API
    this.planetsService.getPlanets().subscribe((Data: any) => {
      // alphabetically sorts planet data by the name of the planet
      let dat: any = [{ name: 'Boyd' }, { name: 'Aaron' }];
      dat = Data.results;
      dat.sort(function (a: any, b: any) {
        if (a.name.toLowerCase() < b.name.toLowerCase()) {
          return -1;
        }
        if (a.name.toLowerCase() > b.name.toLowerCase()) {
          return 1;
        }
        return 0;
      });
      return (this.planetData = dat);
    });
  }
}
