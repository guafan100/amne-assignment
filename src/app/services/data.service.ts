import { Injectable } from '@angular/core';
import { ProcesshttpService } from '../services/processhttp.service';
import { Http, Response } from '@angular/http';

import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

@Injectable()
export class DataService {

  geoUrl: string = 'https://maps.googleapis.com/maps/api/geocode/json?key=AIzaSyBwyhyXYztX3BZsVpqmGIYMcIOak-x5-js&address=';

  requestUrl: string = "https://maps.googleapis.com/maps"+
  "/api/place/nearbysearch/json?radius=16093&type=real_estate_agency&key=AIzaSyBwyhyXYztX3BZsVpqmGIYMcIOak-x5-js&location=";

  constructor(private processhttpservice: ProcesshttpService,
  		private http: Http) { }

  getLoc(url) {
  	return this.http.get(this.geoUrl+url)
  		.map(res => { return this.processhttpservice.extractData(res);});
  }

  getAgencies(loc) {
    console.log(this.requestUrl+loc.lat+","+loc.lng);
  	return this.http.get(this.requestUrl+loc.lat+","+loc.lng)
  		.map(res => { return this.extractData(res)});
  }

  getFollowAgencies(loc, token) {
    console.log((this.requestUrl+loc.lat+","+loc.lng+"&pagetoken="+token));
    return this.http.get(this.requestUrl+loc.lat+","+loc.lng+"&pagetoken="+token)
      .map(res => { return this.extractData(res)});
  }

  extractData(res: Response) {
    let body = res.json();
    return body || { };
  }

}
