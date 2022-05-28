import { HttpClient } from '@angular/common/http';
import {Observable} from "rxjs";
import {Person} from "../models/person";
import {Injectable} from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class PersonService {
  private readonly _url = '';

  constructor(
    private _http: HttpClient
  ) {}

  getAllPersons(): Observable<Person[]> {
  return this._http.get<Person[]>(this._url);
  }

  getPerson(personId: number): Observable<Person> {
    return this._http.get<Person>(this._url + personId);
  }

  savePerson(person: Person): Observable<Person> {
    if (person.id) {
      return this._http.put<Person>(this._url + person.id, person);
    } else {
      return this._http.post<Person>(this._url, person);
    }
  }

  deletePerson(personId: number): Observable<Person> {
    return this._http.delete<Person>(this._url + personId);
  }
}
