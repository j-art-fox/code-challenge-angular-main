import { Component, OnInit } from '@angular/core';
import { PlanetsService } from './star-wars/planets.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  title = 'StarWars PlanetWiki';
  constructor(private planetsService: PlanetsService) {}
  ngOnInit(): void {}
}
