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

  cityUrl: string = 'https://maps.googleapis.com/maps/api/geocode/json?components=country:US|administrative_area:NY|locality:Brooklyn&key=AIzaSyBwyhyXYztX3BZsVpqmGIYMcIOak-x5-js&address=Brooklyn';

  constructor(private processhttpservice: ProcesshttpService,
  		private http: Http) { }

  getLoc(url) {
	return this.http.get(this.geoUrl+url)
		.map(res => { return this.processhttpservice.extractData(res);});
  }

  getAgencies(loc) {
  	return this.http.get(this.requestUrl+loc.lat+","+loc.lng)
  		.map(res => { return this.processhttpservice.extractData(res)});
  }

}
