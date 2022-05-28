import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import {AlertComponent} from "./shared/alert/alert.component";
import {ModalComponent} from "./shared/modal/modal.component";
import {PersonService} from "./core/services/person.service";
import {HttpClientModule} from "@angular/common/http";
import {FormGroupTextComponent} from "./shared/form-group-text/form-group-text.component";
import {ReactiveFormsModule} from "@angular/forms";

@NgModule({
  declarations: [
    AppComponent,
    AlertComponent,
    ModalComponent,
    FormGroupTextComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [
    PersonService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
