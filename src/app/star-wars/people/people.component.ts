import { Component, OnInit } from '@angular/core';
import { PlanetsService } from 'src/app/star-wars/planets.service';

@Component({
  selector: 'app-people',
  templateUrl: './people.component.html',
})
export class PlanetsComponent implements OnInit {
  data: any = [];
  constructor(private planetsService: PlanetsService) {}

  ngOnInit(): void {
    this.planetsService.getPeople().subscribe((data: any) => {
      return (this.data = data.results);
    });
  }
}
