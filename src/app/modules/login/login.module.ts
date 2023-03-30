import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './views/login/login.component';
import { InputComponent } from 'src/app/components/input/input.component';
import { LoginRoutingModule } from './login.routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SimpleCardComponent } from 'src/app/components/simple-card/simple-card.component';
import { ButtonComponent } from 'src/app/components/button/button.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
    CommonModule,
    SimpleCardComponent,
    InputComponent,
    ButtonComponent,
    LoginRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ]
})
export class LoginModule { }
