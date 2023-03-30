import { Component, Inject, Input, OnInit } from '@angular/core';
import {
  MatDialogModule,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { DataService } from 'src/app/services/data.service';
import { DynamicFormComponent } from '../dynamic-form/dynamic-form.component';
import { DynamicForm } from '../dynamic-form/dynamicForm.model';
import { SimpleCardComponent } from '../simple-card/simple-card.component';

@Component({
  selector: 'app-form-dialog',
  templateUrl: './form-dialog.component.html',
  styleUrls: ['./form-dialog.component.scss'],
  standalone: true,
  imports: [
    DynamicFormComponent,
    SimpleCardComponent,
    MatDialogModule,
    MatIconModule,
  ],
})
export class FormDialogComponent implements OnInit {
  @Input() image: string = '';
  formData: DynamicForm[] = [];
  isSubmitting: boolean = false;
  isEdit: boolean = false;
  constructor(
    public dialogRef: MatDialogRef<FormDialogComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: { data: DynamicForm[]; isEdit: boolean },
    private dataService: DataService
  ) {
    this.formData = data?.data;
    this.isEdit = data.isEdit;
    this.listenData();
  }

  listenData() {
    this.dataService.isSubmitting.subscribe((data) => {
      this.isSubmitting = data;
    });
  }

  ngOnInit(): void {}
  close() {
    this.dialogRef.close();
  }

  onSave(formValue: any) {
    if (!this.isEdit) this.dataService.onSubmitData(formValue);
    if (!this.isSubmitting) this.dialogRef.close();
  }
}
