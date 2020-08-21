import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { MessagesComponent } from './messages/messages.component';
import { MessageDetailsComponent } from './message-details/message-details.component';
import { AppRoutingModule } from './app-routing.module';
import { WriteMessageComponent } from './write-message/write-message.component';

import { HttpClientModule } from '@angular/common/http';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService } from './in-memory-data.service';
import { CraftsComponent } from './crafts/crafts.component';
import { LoginComponent } from './login/login.component';
import { WipesComponent } from './wipes/wipes.component';
import { ChatComponent } from './chat/chat.component';

@NgModule({
  declarations: [
    AppComponent,
    MessagesComponent,
    MessageDetailsComponent,
    WriteMessageComponent,
    CraftsComponent,
    LoginComponent,
    WipesComponent,
    ChatComponent,
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule

    /*// The HttpClientInMemoryWebApiModule module intercepts HTTP requests
    // and returns simulated server responses.
    // Remove it when a real server is ready to receive requests.
    HttpClientInMemoryWebApiModule.forRoot(InMemoryDataService, {
      dataEncapsulation: false,
    }),*/
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
