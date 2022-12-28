import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlanetsComponent } from './planets/planets.component';
import { PlanetListComponent } from './planet-list/planet-list.component';
import { PlanetDetailComponent } from './planet-detail/planet-detail.component';
import { FooterComponent } from '../star-wars/footer/footer.component';
import { HeaderComponent } from '../star-wars/header/header.component';
import { JumbotronComponent } from './jumbotron/jumbotron.component';

@NgModule({
  declarations: [
    PlanetsComponent,
    PlanetListComponent,
    PlanetDetailComponent,
    FooterComponent,
    HeaderComponent,
    JumbotronComponent,
  ],
  imports: [CommonModule],
  exports: [PlanetsComponent],
})
export class StarWarsModule {}
