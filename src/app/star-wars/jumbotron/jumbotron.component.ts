import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-jumbotron',
  templateUrl: './jumbotron.component.html',
})
export class JumbotronComponent implements OnInit {
  // Array of planet names for pulling up the images of the planets from the assets folder.
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
