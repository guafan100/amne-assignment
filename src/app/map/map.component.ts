import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { DataService } from '../services/data.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})

export class MapComponent implements OnInit {
	
  lat: number = 30.307182;
  lng: number = -97.755996;
  isValidAddr=true;

  requestUrl : string = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json?radius=500&type=real_estate_agency&keyword=cruise&key=AIzaSyBwyhyXYztX3BZsVpqmGIYMcIOak-x5-js&location=-33.8670522,151.1957362';

  addrForm: FormGroup;

  formErrors = {
    'addrA': '',
    'addrB': ''
  };

  validationMessages = {
    'addrA': {
      'required':      'First Address is required.'
    },
    'addrB': {
      'required':      'Second Address is required.'
    }
  };
  
  constructor(private fb: FormBuilder,
  		private dataservice: DataService) { 
  	this.createForm();
  }

  ngOnInit() {
  }

  createForm() {
    this.addrForm = this.fb.group({
      addrA: ['', [Validators.required] ],
      addrB: ['', [Validators.required] ]
    });

    this.addrForm.valueChanges
      .subscribe(data => this.onValueChanged(data));

    this.onValueChanged(); // (re)set validation messages now
  }

  onValueChanged(data?: any) {
    if (!this.addrForm) { return; }
    const form = this.addrForm;
    for (const field in this.formErrors) {
      // clear previous error message (if any)
      this.formErrors[field] = '';
      const control = form.get(field);
      if (control && control.dirty && !control.valid) {
        const messages = this.validationMessages[field];
        for (const key in control.errors) {
          this.formErrors[field] += messages[key] + ' ';
        }
      }
    }
  }


  onSubmit() {
  	let addressA = this.addrForm.value.addrA;
  	let addressB = this.addrForm.value.addrB;
  	let dataA;
  	let dataB;

  	//use observable to get the location of the two input addresses

	this.dataservice.getLoc(addressA)
		.subscribe(data => { if(data.status === 'OK' ) {		
			dataA = data.results[0].geometry.location;
			console.log(dataA);
			this.dataservice.getLoc(addressB)
			.subscribe(data => { if(data.status === 'OK') {
				dataB = data.results[0].geometry.location;
				console.log(dataB);


			}});
		}});

	this.addrForm.reset({
		addrA: '',
		addrB: ''
	});
  }


}
