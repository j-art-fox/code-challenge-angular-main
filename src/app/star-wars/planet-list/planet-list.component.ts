import { Component, OnInit } from '@angular/core';
import { PlanetsService } from 'src/app/star-wars/planets.service';

@Component({
  selector: 'app-planet-list',
  templateUrl: './planet-list.component.html',
  styleUrls: ['./planet-list.component.scss'],
})
export class PlanetListComponent implements OnInit {
  title = 'planets';
  data2: any = [];
  constructor(private planetsService: PlanetsService) {
    console.log(this.data2);
  }

  ngOnInit(): void {
    this.planetsService.getPlanets().subscribe((data: any) => {
      return (this.data2 = data.results);
    });
  }
}
