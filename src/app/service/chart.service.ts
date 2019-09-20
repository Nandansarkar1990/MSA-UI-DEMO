import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ChartService {
  uri     = 'http://172.16.40.187:9047/';
  API_KEY = 'YOUR_API_KEY';

  constructor(private http: HttpClient) { }

  public getData(userName, Password) {
    const payload = {
      "userName" : userName,
      "password" : Password
    };

    this.http.post(`${this.uri}/apiv2/login`, payload).subscribe((data) => {
        console.log(data);
      });
  }
}