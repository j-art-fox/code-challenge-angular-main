import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-planet-detail',
  templateUrl: './planet-detail.component.html',
})
export class PlanetDetailComponent implements OnInit {
  // inputs data from the planet-list.component
  @Input() planetDetailsData: any = {};

  constructor() {}

  ngOnInit(): void {}
}
