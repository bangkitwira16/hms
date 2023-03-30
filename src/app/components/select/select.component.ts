import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output, SkipSelf } from '@angular/core';
import { ControlContainer, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
export interface Options {id?: number | string, label: string}

@Component({
  selector: 'cmp-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss'],
  standalone: true,
  imports: [MatSelectModule, ReactiveFormsModule, FormsModule, CommonModule],
  viewProviders: [
    {
      provide: ControlContainer,
      useFactory: (container: ControlContainer) => container,
      deps: [[new SkipSelf(), ControlContainer]]
    }
  ]
})

export class SelectComponent implements OnInit {
  @Input() controlName: string = '';
  @Input() placeholder: string  = '';
  @Input() label: string = '';
  @Input() class: string = '';
  @Input() options: Options[] = [];

  @Output() selectModelChange = new EventEmitter<string | number>();
  constructor() { }

  ngOnInit(): void {
  }

}
