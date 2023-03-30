import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { TableHeader } from 'src/app/components/table/TableHeader.model';
import { History } from 'src/app/services/models/history.model';

@Component({
  selector: 'cmp-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss'],
})
export class HistoryComponent implements OnInit {
  @Input() history: History[] = [];
  public historyCol: TableHeader[] = [
    {
      label: 'Time',
      display: 'created_at',
    },
    {
      label: 'Title',
      display: 'assetName',
    },
    {
      label: 'User',
      display: 'userName',
    },
    {
      label: 'Details',
      display: 'details',
    },
  ];
  historyForm: FormGroup
  @Input() isSubmitting: boolean = false;
  @Output() onSubmit = new EventEmitter<string>();

  constructor(private fb: FormBuilder) {
    this.historyForm = this.fb.group({})
  }

  ngOnInit(): void {
    this.initForm()
  }

  initForm(): FormGroup {
    return this.historyForm = this.fb.group({
      key: new FormControl(null, [Validators.required]),
    })
  }

  submit() {
    this.onSubmit.emit(this.historyForm.get('key')?.value || '')
  }
}
