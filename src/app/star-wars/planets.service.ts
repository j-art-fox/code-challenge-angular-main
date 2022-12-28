import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Planet } from './star-wars.interface';

@Injectable({ providedIn: 'root' })
export class PlanetsService {
  constructor(private http: HttpClient) {
    // Gets planets from swapi api
    this.getPlanets().subscribe((planets: any) => {});
  }

  getPlanets(): Observable<Planet[]> {
    const planetApiUrl = 'https://swapi.dev/api/planets';

    return this.http.get<Planet[]>(planetApiUrl);
  }
}
