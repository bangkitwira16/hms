import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './services/auth.guard';

const routes: Routes = [
  {
    path: 'login',
    pathMatch: 'full',
    loadChildren: () =>
      import('./modules/login/login.module').then(
        (module) => module.LoginModule
      ),
  },
  {
    path: '',
    pathMatch: 'full',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./modules/home/home.module').then(
        (module) => module.HomeModule
      ),
  },
  {
    path: 'assets',
    pathMatch: 'full',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./modules/assets/assets.module').then(
        (module) => module.AssetsModule
      ),
  },
  {
    path: 'spare-part',
    pathMatch: 'full',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./modules/spareparts/spareparts.module').then(
        (module) => module.SparepartsModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
