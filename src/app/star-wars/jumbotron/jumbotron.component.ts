import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-jumbotron',
  templateUrl: './jumbotron.component.html',
})
export class JumbotronComponent implements OnInit {
  planets: any = [
    { name: 'Alderaan' },
    { name: 'Tatooine' },
    { name: 'Yavin IV' },
    { name: 'Hoth' },
    { name: 'Dagobah' },
    { name: 'Bespin' },
    { name: 'Endor' },
    { name: 'Naboo' },
    { name: 'Coruscant' },
    { name: 'Kamino' },
  ];

  constructor() {}

  ngOnInit(): void {}
}
