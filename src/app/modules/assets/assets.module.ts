import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import {MatDialogModule} from '@angular/material/dialog';
import { HomeComponent } from './views/home/home.component';
import { AssetRoutingModule } from './assets.routing.module';
import { AssetTableComponent } from './components/asset-table/asset-table.component';
import { TableComponent } from 'src/app/components/table/table.component';
import { InputComponent } from 'src/app/components/input/input.component';
import { ButtonComponent } from 'src/app/components/button/button.component';
import { ReactiveFormsModule } from '@angular/forms';
import { DynamicFormComponent } from 'src/app/components/dynamic-form/dynamic-form.component';
import { FormDialogComponent } from 'src/app/components/form-dialog/form-dialog.component';


@NgModule({
  declarations: [
    HomeComponent,
    AssetTableComponent
  ],
  imports: [
    CommonModule,
    AssetRoutingModule,
    TableComponent,
    InputComponent,
    ButtonComponent,
    ReactiveFormsModule,
    DynamicFormComponent,
    MatDialogModule,
    FormDialogComponent,
  ],
  providers: [DatePipe]
})
export class AssetsModule { }
