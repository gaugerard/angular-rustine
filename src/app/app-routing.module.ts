import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WipesComponent } from './wipes/wipes.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './_helpers/auth.guard';
import { CraftsComponent } from './crafts/crafts.component';
import { ChatComponent } from './chat/chat.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'wipes',
    component: WipesComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'crafts/:wipe_id',
    component: CraftsComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'chat/:wipe_id',
    component: ChatComponent,
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
