import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './views/home/home.component';
import { HomeRoutingModule } from './home.routing.module';
import { TableComponent } from 'src/app/components/table/table.component';
import { ButtonComponent } from 'src/app/components/button/button.component';
import { HistoryComponent } from './components/history/history.component';
import { InputComponent } from 'src/app/components/input/input.component';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    HomeComponent,
    HistoryComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    TableComponent,
    ButtonComponent,
    InputComponent,
    ReactiveFormsModule
  ]
})
export class HomeModule { }
