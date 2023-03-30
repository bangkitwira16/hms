import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'cmp-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
  standalone: true,
  imports: [MatButtonModule, MatIconModule, CommonModule],
})
export class ButtonComponent implements OnInit {
  @Input() text: string = '';
  @Input() icon: string = '';
  @Input() class: string = '';
  @Input() disabled: boolean = false;
  @Output()
  public onClick: EventEmitter<any> = new EventEmitter();
  constructor() {}

  ngOnInit(): void {}

  click() {
    this.onClick.emit();
  }
}
