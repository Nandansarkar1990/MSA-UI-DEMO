import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import * as $ from 'jquery'

@Injectable({
  providedIn: 'root'
})
export class ChartService {
  uri     = 'http://localhost:9047';
  API_KEY = 'YOUR_API_KEY';
  authToken = undefined;
  auth = undefined;
  constructor(private http: HttpClient) { }

  // public getAuthToken() {
  //   const payload = {
  //     "userName" : 'MSA',
  //     "password" : 'Password@123'
  //   };

  //   this.http.post(`${this.uri}/apiv2/login`, payload).subscribe((data) => {
  //     this.authToken = data;
  //     if(this.authToken && this.authToken.token) {
  //       this.getJobID('_dremio'+this.authToken.token)
  //     }
  //   });
  // }

  // public getJobID(token) {
  //   if(token) {
  //     var reqHeader = new HttpHeaders({ 
  //       'Content-Type': 'application/json',
  //       'Authorization':  token
  //    });
  //   localStorage.setItem('Authorization', token);
  //   //  console.log(reqHeader);
  //   console.log(reqHeader);
  //    let payload = {
  //     "sql": "SELECT  vendor_id,count(passenger_count) FROM test.test_data group by vendor_id,passenger_count"
  //    }
  //    this.http.post(`${this.uri}/api/v3/sql`, payload,  {headers: reqHeader}).subscribe(data => {
  //       if(data) {
  //         this.getData(data, token);
  //       }
  //    })
  //   }
  // };

  public getData(data, token) {
    // if(data) {
      localStorage.setItem('Authorization', '_dremio1q8voeql2s0a1m91jrclecf22i');
    //   var reqHeader = new HttpHeaders({ 
    //     'Content-Type': 'application/json',
    //     'Access-Control-Allow-Origin':'*',
    //     'Authorization':  localStorage.getItem('Authorization')
    //  });
    var reqHeader = new HttpHeaders()
    reqHeader.append('Access-Control-Allow-Origin', 'http://localhost:9047')
    reqHeader.append('Access-Control-Allow-Headers', 'Content-type')
    // reqHeader.append('Content-Type', 'application/json')
    reqHeader.append('Authorization', '_dremio1q8voeql2s0a1m91jrclecf22i')
     console.log(reqHeader);
     this.http.get(`https://cors-anywhere.herokuapp.com/${this.uri}/api/v3/22772b1a-5290-e8cc-b44b-3383f2d3c400/results`,  {headers: reqHeader}).subscribe(data => {
      if(data) {
          console.log(data);
        }
      })
    // }
  }
}