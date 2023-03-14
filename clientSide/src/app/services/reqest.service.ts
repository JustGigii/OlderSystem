import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { iolderpage, iolderItem, iolderItemFull } from 'src/app/page tample/homepage';
import { prodact } from '../page tample/prodactTemplete';
import { NewOrder } from '../page tample/prodactTemplete';
import { CreateUserDetails,UserDetails } from "../page tample/profile";
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

  getOldersByUser(number: number ): Observable<iolderItem[]> {
    return  this.http.get<iolderItem[]>(this.apiUrl+"/Olders/users/"+number);
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
  postOlder(older:NewOrder): Observable<NewOrder>
  {
    // return this.http.post<NewOrder>(this.apiUrl+"/Olders",older,httpOptions)
    return this.http.post<NewOrder>("http://localhost:5075/Olders",older,httpOptions)
  }
  postUser(user:CreateUserDetails): Observable<UserDetails>
  {
    return this.http.post<UserDetails>(this.apiUrl+"/Users",user,httpOptions)
  }
  getUser(id:string): Observable<UserDetails>{
    return this.http.get<UserDetails>(this.apiUrl+'/Users/'+id);
  }
  updateUser(user:UserDetails): Observable<UserDetails>
  {
    return this.http.put<UserDetails>(this.apiUrl+"/Users",user,httpOptions)
  }
  // sendNewOrder(newOrder: NewOrder) {
  //   return this.http.post<NewOrder>(this);
  // }

}
