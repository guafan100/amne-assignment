import { Injectable } from '@angular/core';
import { ProcesshttpService } from '../services/processhttp.service';
import { Http, Response } from '@angular/http';

import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

@Injectable()
export class DataService {

  geoUrl: string = 'https://maps.googleapis.com/maps/api/geocode/json?key=AIzaSyBwyhyXYztX3BZsVpqmGIYMcIOak-x5-js&address=';
  
  constructor(private processhttpservice: ProcesshttpService,
  		private http: Http) { }

  getLoc(url) {
	return this.http.get(this.geoUrl+url)
		.map(res => { return this.processhttpservice.extractData(res);});
  }

}
