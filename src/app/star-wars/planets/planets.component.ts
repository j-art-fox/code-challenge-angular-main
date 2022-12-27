import { Component, OnInit } from '@angular/core';
import { PlanetsService } from 'src/app/star-wars/planets.service';

@Component({
  selector: 'app-planets',
  templateUrl: './planets.component.html',
  styleUrls: ['./planets.component.scss'],
})
export class PlanetsComponent implements OnInit {
  planetData: any = [];
  peopleData: any = [];
  constructor(private planetsService: PlanetsService) {}

  ngOnInit(): void {
    this.planetsService.getPlanets().subscribe((planetData: any) => {
      return (this.planetData = planetData.results);
    });
    this.planetsService.getPeople().subscribe((data: any) => {
      return (this.peopleData = data.results);
    });
  }
}
