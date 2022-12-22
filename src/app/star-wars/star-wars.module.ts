import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlanetsComponent } from './planets/planets.component';
import { PlanetListComponent } from './planet-list/planet-list.component';
import { PlanetDetailComponent } from './planet-detail/planet-detail.component';

@NgModule({
  declarations: [
    PlanetsComponent,
    PlanetListComponent,
    PlanetDetailComponent
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    PlanetsComponent,
  ]
})
export class StarWarsModule { }
