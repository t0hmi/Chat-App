import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { StoreDevtoolsModule } from "@ngrx/store-devtools";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import { environment } from 'src/environments/environment';
import { UserRegisterComponent } from './components/user/user-register/user-register.component';
import { UserLoginComponent } from './components/user/user-login/user-login.component';
import { UserInfoComponent } from './components/user/user-info/user-info.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { metaReducers, reducers } from './store';
import { LoadingComponent } from './components/user/loading/loading.component';
import { HttpClientModule } from '@angular/common/http';
import { EffectsModule } from '@ngrx/effects';
import { RedirectComponent } from './components/user/redirect/redirect.component';
import { UserEffect } from './store/user/user.effect';
import { CookieService } from 'ngx-cookie-service';
import { ChatMainComponent } from './components/chat/chat-main/chat-main.component';
import { ChatSidebarComponent } from './components/chat/chat-sidebar/chat-sidebar.component';
import { ChatCreateComponent } from './components/chat/chat-create/chat-create.component';
import { ChannelEffect } from './store/channel/channel.effect';
import { ChatMessageComponent } from './components/chat/chat-message/chat-message.component';

@NgModule({
  declarations: [
    AppComponent,
    UserRegisterComponent,
    UserLoginComponent,
    UserInfoComponent,
    LoadingComponent,
    RedirectComponent,
    ChatMainComponent,
    ChatSidebarComponent,
    ChatCreateComponent,
    ChatMessageComponent
  ],
  imports: [
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserModule,
    AppRoutingModule,
    StoreModule.forRoot(reducers, {metaReducers}),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.production,
    }),
    EffectsModule.forRoot([UserEffect, ChannelEffect]),
  ],
  providers: [CookieService],
  bootstrap: [AppComponent]
})
export class AppModule { }
