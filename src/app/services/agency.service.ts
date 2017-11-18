import { Injectable } from '@angular/core';

@Injectable()
export class AgencyService {

  constructor() { }

  getAgencies(listA, listB, locA, locB){
  	var agencies = [];

  	let latA = Number(locA.lat);
  	let lngA = Number(locA.lng);
  	let latB = Number(locB.lat);
  	let lngB = Number(locB.lng); 

    // get results in listA and listB
    var agenciesA = [];
    var agenciesB = [];

    this.getResult(listA, latA, lngA, latB, lngB, agenciesA);
    this.getResult(listB, latA, lngA, latB, lngB, agenciesB);

    //merge by gid and sort by sum

    agencies = agenciesA.concat(agenciesB.filter(function(item){
      return -1 == agenciesA.findIndex(function(element){
        return element.gid == item.gid;
      });
    }));


    let sorted_agencies = agencies.sort((a1, a2) => a1.sum-a2.sum);
    let ret = [];
    for(let i in sorted_agencies) {
      let currAgency = sorted_agencies[i];
      currAgency.id = (Number(i)+1);
      ret.push(currAgency);
    }
  	return ret;
  }

  getResult(list, latA, lngA, latB, lngB, arr) {
    for(let point of list.results) {
      let currLat = point.geometry.location.lat;
      let currLng = point.geometry.location.lng;
      let distA = this.getDistance(currLat, currLng, latA, lngA);
      let distB = this.getDistance(currLat, currLng, latB, lngB);
      arr.push({
        name: point.name,
        distanceA: distA,
        distanceB: distB,
        sum: (distA+distB),
        gid: point.id,
        vic: point.vicinity
      });
    }
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
