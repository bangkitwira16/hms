import { CommonModule } from '@angular/common';
import { Component, ContentChild, Input, OnInit, TemplateRef } from '@angular/core';
import {MatCardModule} from '@angular/material/card';
@Component({
  selector: 'cmp-simple-card',
  templateUrl: './simple-card.component.html',
  styleUrls: ['./simple-card.component.scss'],
  standalone: true,
  imports: [MatCardModule, CommonModule]
})
export class SimpleCardComponent implements OnInit {

	@ContentChild(TemplateRef)
  templateRef!: TemplateRef<any>;
  @Input() class: string = ''
  @Input() title: string = ''
  @Input() contentClass: string = ''
  constructor() {
  }

  ngOnInit(): void {
  }

}
