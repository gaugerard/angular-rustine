import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MessagesComponent } from './messages/messages.component';
import { WriteMessageComponent } from './write-message/write-message.component';
import { MessageDetailsComponent } from './message-details/message-details.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './_helpers/auth.guard';
import { CraftsComponent } from './crafts/crafts.component'

const routes: Routes = [
  //{ path: '', redirectTo: '/messages', pathMatch: 'full' },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'messages', component: MessagesComponent, canActivate: [AuthGuard] },
  { path: 'write-message', component: WriteMessageComponent, canActivate: [AuthGuard] },
  { path: 'detail/:id', component: MessageDetailsComponent, canActivate: [AuthGuard] },
  { path: 'crafts', component: CraftsComponent, canActivate: [AuthGuard]  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
