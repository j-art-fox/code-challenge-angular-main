import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IPlanet } from './star-wars.interface';

@Injectable({ providedIn: 'root' })
export class PlanetsService {
  constructor(private http: HttpClient) {
    // Example on getting planets from swapi api
    this.getPlanets().subscribe((planets: any) => {
      console.log(planets);
      return planets;
    });
  }
  // https://angular.io/guide/glossary#observable
  // A producer of multiple values, which it pushes to subscribers. Used for asynchronous event handling throughout Angular.
  getPlanets(): Observable<any> {
    const planetApiUrl = 'https://swapi.dev/api/planets';
    return this.http.get<IPlanet>(planetApiUrl);
  }
}
