import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule, MatCheckboxModule, MatDatepickerModule, MatFormFieldModule,
  MatInputModule, MatRadioModule, MatSelectModule, MatSliderModule,
  MatSlideToggleModule, MatToolbarModule, MatListModule, MatGridListModule,
  MatCardModule, MatIconModule, MatProgressSpinnerModule, MatDialogModule, MatChipsModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AgmCoreModule } from '@agm/core';

import 'hammerjs';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { MapComponent } from './map/map.component';




@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    MapComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatButtonModule, MatCheckboxModule, MatDatepickerModule, MatFormFieldModule,
      MatInputModule, MatRadioModule, MatSelectModule, MatSliderModule,
      MatSlideToggleModule, MatToolbarModule, MatListModule, MatGridListModule,
      MatCardModule, MatIconModule, MatProgressSpinnerModule, MatDialogModule, MatChipsModule,
    FlexLayoutModule,
    CommonModule,
    FormsModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyBwyhyXYztX3BZsVpqmGIYMcIOak-x5-js'
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
