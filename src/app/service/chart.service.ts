import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subject } from 'rxjs';
import * as $ from 'jquery'

@Injectable({
  providedIn: 'root'
})
export class ChartService {
  uri     = 'http://localhost:9047';
  API_KEY = 'YOUR_API_KEY';
  authToken = undefined;
  auth = undefined;
  selectedVendor = new Subject();
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

  public getData() {
    let reqHeader = new HttpHeaders()
    reqHeader.append('Content-Type', 'application/json')
     console.log(reqHeader);
     let payload = {
        "sql": "SELECT * FROM usecase.VendorWiseTaxiSales "
      }
      return this.http.post(`http://localhost:9000/msa_poc/v1/data`, payload, {headers: reqHeader})
  }
  
}