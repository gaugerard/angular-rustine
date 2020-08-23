import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { HttpClientModule } from '@angular/common/http';
import { CraftsComponent } from './crafts/crafts.component';
import { LoginComponent } from './login/login.component';
import { WipesComponent } from './wipes/wipes.component';
import { ChatComponent } from './chat/chat.component';
import { CreateAccountComponent } from './create-account/create-account.component';

import { FormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';

@NgModule({
  declarations: [
    AppComponent,
    CraftsComponent,
    LoginComponent,
    WipesComponent,
    ChatComponent,
    CreateAccountComponent,
  ],
  imports: [
    FormsModule,
    HttpClientModule,
    BrowserModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
    MatAutocompleteModule,

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
