import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StudentFormComponent } from './student-form/student-form.component';

import { ReactiveFormsModule } from '@angular/forms';
import { provideHttpClient } from '@angular/common/http';


import { FormsModule } from '@angular/forms';
import {NgxMaskDirective, NgxMaskPipe, provideNgxMask} from 'ngx-mask';
import { TestComponent } from './test/test.component';
import { DateComponent } from './date/date.component';
import { AlphaNumericComponent } from './alpha-numeric/alpha-numeric.component' 






@NgModule({
  declarations: [
    AppComponent,
    StudentFormComponent,
    TestComponent,
    DateComponent,
    AlphaNumericComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    NgxMaskDirective,
    NgxMaskPipe,
    

    
    
  
    

   
  ],
  providers: [provideHttpClient(),provideNgxMask()],
  bootstrap: [AppComponent]
})
export class AppModule { }
