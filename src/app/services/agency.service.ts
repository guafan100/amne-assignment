import { Injectable } from '@angular/core';

@Injectable()
export class AgencyService {

  constructor() { }

  getAgencies(data, locA, locB){
  	var agencies = [];

  	console.log("test: "+ this.getDistance(38.898556, -77.037852, 38.897147, -77.043934));

  	let latA = Number(locA.lat);
  	let lngA = Number(locA.lng);
  	let latB = Number(locB.lat);
  	let lngB = Number(locB.lng); 
  	for(let point of data.results) {
  		let currLat = point.geometry.location.lat;
  		let currLng = point.geometry.location.lng;
  		let distB = this.getDistance(currLat, currLng, latB, lngB);
  		if(distB < 10) {
  			let distA = this.getDistance(currLat, currLng, latA, lngA);
  			agencies.push({
  				name: point.name,
  				distanceA: distA,
  				distanceB: distB,
  				sum: (distA+distB)
  			});
  		}
  	}
    let sorted_agencies = agencies.sort((a1, a2) => a1.sum-a2.sum);
    let ret = [];
    for(let i in sorted_agencies) {
      let currAgency = sorted_agencies[i];
      currAgency.id = (Number(i)+1);
      ret.push(currAgency);
    }
  	return ret;
  }

  getDistance(lat1, lng1, lat2, lng2) {
  	let radius = 3959;
    let sinlat = Math.sin(this.getRad(lat2-lat1) / 2);
    let sinlng = Math.sin(this.getRad(lng2-lng1) / 2);
    
    let a = Math.pow(sinlat, 2) + Math.pow(sinlng, 2)
      * Math.cos(this.getRad(lat1)) * Math.cos(this.getRad(lat2));
    let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    let d = radius * c;

    return d;
  
  }

  getRad(num) {
  	return num * Math.PI / 180;
  }

}
