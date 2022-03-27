import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Truthtable } from './truthtable';

@Injectable({
  providedIn: 'root'
})
export class TruthtableService {

  constructor(private http: HttpClient) { }

  getTruthtable() {
    return this.http.get<Truthtable>('/Twitter');
  }
}
