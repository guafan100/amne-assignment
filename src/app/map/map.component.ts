import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { DataService } from '../services/data.service';
import { AgencyService } from '../services/agency.service';

import { MatTableDataSource } from '@angular/material';

import { MatDialog, MatDialogRef } from '@angular/material';

import { DialogComponent } from '../dialog/dialog.component';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})

export class MapComponent implements OnInit {

  //Austin location	
  lat: number = 30.307182;
  lng: number = -97.755996;

  displayedColumn = ['position', 'name', 'weight', 'symbol'];
    ELEMENT_DATA = [
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
  {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
  {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
  {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
  {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
  {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
  {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
  {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
  {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
  {position: 11, name: 'Sodium', weight: 22.9897, symbol: 'Na'},
  {position: 12, name: 'Magnesium', weight: 24.305, symbol: 'Mg'},
  {position: 13, name: 'Aluminum', weight: 26.9815, symbol: 'Al'},
  {position: 14, name: 'Silicon', weight: 28.0855, symbol: 'Si'},
  {position: 15, name: 'Phosphorus', weight: 30.9738, symbol: 'P'},
  {position: 16, name: 'Sulfur', weight: 32.065, symbol: 'S'},
  {position: 17, name: 'Chlorine', weight: 35.453, symbol: 'Cl'},
  {position: 18, name: 'Argon', weight: 39.948, symbol: 'Ar'},
  {position: 19, name: 'Potassium', weight: 39.0983, symbol: 'K'},
  {position: 20, name: 'Calcium', weight: 40.078, symbol: 'Ca'},
];
  dataSources = new MatTableDataSource(this.ELEMENT_DATA);



  //indicating whether the status === 'OK'
  isValidAddr = true;

  //agencies copy
  agencies;

  //for mat-table
  dataSource;
  displayedColumns = ['id', 'name', 'distanceA', 'distanceB', 'sum'];

  //for two addresses input
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
  		private dataservice: DataService,
  		private agencyservice: AgencyService,
  		public dialog: MatDialog) { 
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
  	this.isValidAddr = true;
  	let addressA = this.addrForm.value.addrA;
  	let addressB = this.addrForm.value.addrB;
  	//use observable to get the location of the two input addresses

	this.dataservice.getLoc(addressA)
		.subscribe(data => { if(data.status === 'OK' ) {		
			let dataA = data.results[0].geometry.location;
			console.log(dataA);
			this.dataservice.getLoc(addressB)
			.subscribe(data => { if(data.status === 'OK') {
				let dataB = data.results[0].geometry.location;
				console.log(dataB);

				this.dataservice.getAgencies(dataA)
					.subscribe(data => { 


					//get the agencies that are less than 10 miles from B
					this.agencies = this.agencyservice.getAgencies(data, dataA, dataB);
					this.dataSource = new MatTableDataSource(this.agencies);


					console.log(this.agencies);

				}); 
			}else {this.isValidAddr = false;}});
		}else {this.isValidAddr = false;}});

	if(!this.isValidAddr) {
		this.openDialog();
	}

	this.addrForm.reset({
		addrA: '',
		addrB: ''
	});
	
  }

  openDialog() {
    this.dialog.open(DialogComponent, {width: '800px', height: '120px'});
  }

}
