import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MessagesComponent } from './messages/messages.component';
import { WriteMessageComponent } from './write-message/write-message.component';
import { MessageDetailsComponent } from './message-details/message-details.component'

const routes: Routes = [
  { path: '', redirectTo: '/messages', pathMatch: 'full' },
  { path: 'messages', component: MessagesComponent },
  { path: 'write-message', component: WriteMessageComponent },
  {path: 'detail/:id', component: MessageDetailsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)], 
  exports: [RouterModule],
})
export class AppRoutingModule {}
