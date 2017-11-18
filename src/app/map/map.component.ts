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

  helper(data, dataA, listA) {
    if(!data || !data.next_page_token) return;
    else {
       let tmpdata;
       console.log(data);
       this.dataservice.getFollowAgencies(dataA, data.next_page_token)
        .subscribe(data => {
          listA.push(data); 
          if(data.next_page_token) {
            this.dataservice.getFollowAgencies(dataA, data.next_page_token)
              .subscribe(data => {
                listA.push(data);
              });          
          }
        });       
    }
  }

  onSubmit() {
    let finishedA = false;
    let finishedB = false;
  	this.isValidAddr = true;
  	let addressA = this.addrForm.value.addrA;
  	let addressB = this.addrForm.value.addrB;
    let listA = [];
    let listB = [];
    let dataA;
    let dataB;
  	//use observable to get the location of the two input addresses

    this.dataservice.getLoc(addressA)
      .subscribe(data => {if(data.status === 'OK'){
        dataA = data.results[0].geometry.location;  

        this.dataservice.getAgencies(dataA)
          .subscribe(data => {
            console.log(dataA);
            listA.push(data);
            this.helper(data, dataA, listA);
          });

        }else {this.isValidAddr=false;}});

//    this.dataservice.getLoc(addressB)
//      .subscribe(data => {if(data.status === 'OK'){
//        dataB = data.results[0].geometry.location;  

//        this.dataservice.getAgencies(dataB)
//          .subscribe(data => {
//            console.log(dataB);
//            listA.push(data);
//            this.helper(data, dataB, listB);
//          });

//        }else {this.isValidAddr=false;}});


    setTimeout(function(){console.log(listA)}, 3000);



  	if(!this.isValidAddr) {
  		this.openDialog();
  	}

  	this.addrForm.reset({
  		addrA: '',
  		addrB: ''
  	});
	
  }
  function(listA, listB){
    console.log(listA);
    //console.log(listB);    
    if(!this.isValidAddr) {
      this.openDialog();
    }
  }

  openDialog() {
    this.dialog.open(DialogComponent, {width: '800px', height: '120px'});
  }

}
