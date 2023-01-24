import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { iolderpage, iolderItem, iolderItemFull } from 'src/app/page tample/homepage';
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
};


@Injectable({
  providedIn: 'root'
})
export class ReqestService {
  apiUrl = "https://prodacthandeler.azurewebsites.net"
  constructor(private http: HttpClient) { }

  getOlders(): Observable<iolderItem[]> {
    return  this.http.get<iolderItem[]>(this.apiUrl+"/Olders");
  }

  getOlder(id:number): Observable<iolderItemFull>{
    return this.http.get<iolderItemFull>(this.apiUrl+'/Olders/'+id);
  }

}
