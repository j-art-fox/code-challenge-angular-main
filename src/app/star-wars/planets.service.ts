import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Planet } from './star-wars.interface';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class PlanetsService {
  constructor(private http: HttpClient) {
    // Example on getting planets from swapi api
    this.getPlanets().subscribe((planets: any) => {
      console.log(planets.results);
    });
  }

  getPlanets(): Observable<Planet[]> {
    const planetApiUrl = 'https://swapi.dev/api/planets';
    console.log(planetApiUrl);
    return this.http.get<Planet[]>(planetApiUrl);
  }
}
