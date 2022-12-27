import { Component, OnInit, Input } from '@angular/core';
import { PlanetsService } from 'src/app/star-wars/planets.service';

@Component({
  selector: 'app-planet-list',
  templateUrl: './planet-list.component.html',
  styleUrls: ['./planet-list.component.scss'],
})
export class PlanetListComponent implements OnInit {
  @Input() planetData: any = [];
  @Input() peopleData: any = [];

  title = 'planets';

  constructor(private planetsService: PlanetsService) {}

  ngOnInit(): void {}
}
