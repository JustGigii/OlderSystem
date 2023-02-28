import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { iolderpage, iolderItem, iolderItemFull } from 'src/app/page tample/homepage';
import { prodact } from '../page tample/prodactTemplete';
import { NewOrder } from '../page tample/prodactTemplete';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
};

@Injectable({
  providedIn: 'root'
})
export class ReqestService {
  apiUrl = "https://oldersystem.azurewebsites.net/"
  constructor(private http: HttpClient) { }

  getOlders(): Observable<iolderItem[]> {
    return  this.http.get<iolderItem[]>(this.apiUrl+"/Olders");
  }

  getOldersByUser(): Observable<iolderItem[]> {
    return  this.http.get<iolderItem[]>(this.apiUrl+"/Olders/users/"+1);
  }

  getOlder(id:number): Observable<iolderItemFull>{
    return this.http.get<iolderItemFull>(this.apiUrl+'/Olders/'+1+"?olderId="+id);
  }

  getProdacts(): Observable<prodact[]>
  {
    return this.http.get<prodact[]>(this.apiUrl+"/Prodact");
  }
  getprdact(id:number): Observable<prodact>{
    return this.http.get<prodact>(this.apiUrl+'/Prodact/'+id);
  }

  // sendNewOrder(newOrder: NewOrder) {
  //   return this.http.post<NewOrder>(this);
  // }

}
