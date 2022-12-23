import { Component, OnInit } from '@angular/core';
import { PlanetsService } from '../planets.service';

@Component({
  selector: 'app-planet-list',
  templateUrl: './planet-list.component.html',
  styleUrls: ['./planet-list.component.scss'],
})
export class PlanetListComponent implements OnInit {
  public planets = [];

  ngOnInit() {}
}
