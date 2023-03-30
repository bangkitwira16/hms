import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {MatSidenavModule} from '@angular/material/sidenav';
import { SidebarMenuModel } from './sidebar.model';
import {MatIconModule} from '@angular/material/icon';
import { sidebar } from 'src/app/constants/sidebar-const';
import { CommonModule } from '@angular/common';
import { BaseService } from 'src/app/services/base.service';
import { User } from 'src/app/modules/login/shared/models/user.model';
import { Router } from '@angular/router';

@Component({
  selector: 'cmp-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  standalone: true, 
  imports: [MatSidenavModule, MatButtonModule, MatIconModule, CommonModule]
})
export class SidebarComponent implements OnInit {

  sidebarMenu: SidebarMenuModel[] = sidebar
  user: User | undefined = undefined
  activeRoute: string = ''
  constructor(private router: Router, private baseService: BaseService) { 
  }
  
  ngOnInit(): void {
    this.getUser()
  }
  
  public accessLink(menu: SidebarMenuModel, parentmenu?: SidebarMenuModel) {
    const url = parentmenu ? (parentmenu.link.toString() + menu.link.toString()).split('/') : menu.link;
    this.router.navigate([url]);
	}

	getActiveClass(menu: SidebarMenuModel) {
		if (menu.link[0] == '' && this.router.url != '/') return '';
		return this.router.url.trim().includes(menu.link[0]) ? 'menu-active' : '';
	}

  public toggle(menu: SidebarMenuModel): void {
			this.accessLink(menu);
	}

  private getUser() {
    this.user = this.baseService.getUser()
    console.log(this.user)
  }

  public navigateHome() {
    this.router.navigate([''])
  }

  public loggedOut() {
    this.baseService.logout()
    this.router.navigate(['login'])
  }

}
