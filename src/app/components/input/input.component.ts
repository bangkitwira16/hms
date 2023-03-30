import { Component, EventEmitter, Input, OnInit, Output, SkipSelf } from '@angular/core';
import { ControlContainer, FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatInputModule} from '@angular/material/input';

@Component({
  selector: 'cmp-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
  standalone: true,
  imports: [MatInputModule, ReactiveFormsModule, FormsModule],
  viewProviders: [
    {
      provide: ControlContainer,
      useFactory: (container: ControlContainer) => container,
      deps: [[new SkipSelf(), ControlContainer]]
    }
  ]
})
export class InputComponent implements OnInit {
  
  @Input() controlName: string = '';
  @Input() disabled: boolean = false;
  @Input() type: string = 'text';
  @Input() placeholder: string  = '';
  @Input() label: string = '';
  @Input() class: string = '';

  @Output() inputModelChange = new EventEmitter<string>();
  constructor() { }

  ngOnInit(): void {
  }

}
