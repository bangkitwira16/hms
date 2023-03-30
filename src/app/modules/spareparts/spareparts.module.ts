import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { SparepartComponent } from './views/sparepart/sparepart.component';
import { SparepartTableComponent } from './components/sparepart-table/sparepart-table.component';
import { InputComponent } from 'src/app/components/input/input.component';
import { ButtonComponent } from 'src/app/components/button/button.component';
import { TableComponent } from 'src/app/components/table/table.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SparepartsRoutingModule } from './spareparts.routing.module';
import { MatDialogModule } from '@angular/material/dialog';



@NgModule({
  declarations: [
    SparepartComponent,
    SparepartTableComponent
  ],
  imports: [
    CommonModule,
    InputComponent,
    ButtonComponent,
    TableComponent,
    ReactiveFormsModule,
    SparepartsRoutingModule,
    MatDialogModule
  ],
  providers: [DatePipe]
})
export class SparepartsModule { }
