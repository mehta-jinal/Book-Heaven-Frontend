import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CommonapiService {

  constructor(public http: HttpClient) { }

  public fetchMe(){
    return this.http.get('http://localhost:1003/books');
  }

  
}