import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { DataService } from 'src/app/services/data.service';
import { ButtonComponent } from '../button/button.component';
import { InputComponent } from '../input/input.component';
import { SelectComponent } from '../select/select.component';
import { DynamicForm } from './dynamicForm.model';

@Component({
  selector: 'cmp-dynamic-form',
  templateUrl: './dynamic-form.component.html',
  styleUrls: ['./dynamic-form.component.scss'],
  standalone: true,
  imports: [ReactiveFormsModule, SelectComponent, InputComponent, ButtonComponent, CommonModule],
})
export class DynamicFormComponent implements OnInit {
  @Input() formData: DynamicForm[] = [];
  @Input() isSubmitting: boolean = false;
  @Input() isEdit: boolean = false;

  dynamicForm!: FormGroup;
  formLength: number = 0;
  @Output()
  public onSubmit: EventEmitter<any> = new EventEmitter();

  constructor(private dataService: DataService) {}

  initForm() {
    let forms: any = {};
    this.formData.forEach((form) => {
      forms[form.name] = new FormControl('', Validators.required);
    });    
    this.dynamicForm = new FormGroup(forms);
    this.formData.forEach(data => {
      if (data.value)
        this.dynamicForm.get(data.name)?.setValue(data.value)
    })
    this.formLength = Object.keys(this.dynamicForm.value).length;
  }

  ngOnInit(): void {
    this.initForm();
  }

  setControl(value: string) {
    const name = `${value}`;
    return name;
  }

  submit() {
    if (this.isEdit) {
      this.dataService.onEdit(this.dynamicForm.value)
    }
    this.onSubmit.emit(this.dynamicForm.value)
  }

  delete() {
    const id = this.dynamicForm.get('id')?.value
    this.dataService.onDelete(id)
  }
}
