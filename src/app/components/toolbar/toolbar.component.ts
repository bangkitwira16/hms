import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {MatToolbarModule} from '@angular/material/toolbar';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'cmp-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
  standalone: true,
  imports: [MatToolbarModule, CommonModule]
})
export class ToolbarComponent implements OnInit {

  activeRoute: string = ''
  constructor(private router: Router) { 
    this.getActiveUrl()
  }

  getActiveUrl() {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.activeRoute = event.url.split('/').join('');
        console.log( this.activeRoute, 'ini')
      }
    });
  }

  ngOnInit(): void {
  }

}
