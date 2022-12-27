import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-planet-detail',
  templateUrl: './planet-detail.component.html',
  styleUrls: ['./planet-detail.component.scss'],
})
//  implements OnInit
export class PlanetDetailComponent implements OnInit {
  @Input() planetDetailsData: any = [];

  constructor() {}

  ngOnInit(): void {}
}
