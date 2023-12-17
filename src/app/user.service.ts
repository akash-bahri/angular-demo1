import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppConfig } from './config';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl = 'https://smooth-comfort-405104.uc.r.appspot.com/document/';
  private getuserUrl = this.apiUrl + 'findAll/userx';
  private getcatalogUrl = this.apiUrl + 'findAll/catalog';
  private getordersUrl = this.apiUrl + 'findAll/orders';
  private postUserUrl = this.apiUrl + 'createorupdate/userx';
  private postOrderUrl = this.apiUrl + 'createorupdate/orders';
  private deleteOrderUrl = this.apiUrl + 'deleteOne/orders';
  // private postCatalogUrl = this.apiUrl + 'createorupdate/catalog';
  constructor(private http: HttpClient) {}

  getAllUsers(): Observable<any> {
    const headers = new HttpHeaders().set('Authorization',AppConfig.apiKey);
    return this.http.get(this.getuserUrl, {headers});
  }
  getCatalog(): Observable<any> {
    const headers = new HttpHeaders().set('Authorization',AppConfig.apiKey);
    return this.http.get(this.getcatalogUrl, {headers});
  }
  getOrders(): Observable<any> {
    const headers = new HttpHeaders().set('Authorization',AppConfig.apiKey);
    return this.http.get(this.getordersUrl, {headers});
  }
  postUser(username: string, password: string): Observable<any> {
    const headers = new HttpHeaders().set('Authorization',AppConfig.apiKey);
    return this.http.post(this.postUserUrl, { "username":username, "password":password }, {headers});
  }
  postOrder(cart: any, user: any): Observable<any> {
    const headers = new HttpHeaders().set('Authorization',AppConfig.apiKey);
    return this.http.post(this.postOrderUrl, { "user":user, "items":cart }, {headers});
  }
  deleteOrder(order: any): Observable<any> {
    const headers = new HttpHeaders().set('Authorization',AppConfig.apiKey);
    return this.http.delete(this.deleteOrderUrl + '/' + order._id, {headers});
  }
}
