import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChatMainComponent } from './components/chat/chat-main/chat-main.component';
import { LoadingComponent } from './components/user/loading/loading.component';
import { RedirectComponent } from './components/user/redirect/redirect.component';
import { UserInfoComponent } from './components/user/user-info/user-info.component';
import { UserLoginComponent } from './components/user/user-login/user-login.component';
import { UserRegisterComponent } from './components/user/user-register/user-register.component';
import { AuthGuard } from './guard/auth.guard';
import { UrlResolverService } from './services/url-resolver.service';

const routes: Routes = [
  {path: '',component: ChatMainComponent, canActivate: [AuthGuard]},
  {path: 'login',component: UserLoginComponent},
  {path: 'register',component: UserRegisterComponent},
  {path: 'user',component: UserInfoComponent},
  {path: 'auth', component: LoadingComponent,  resolve: {'url' : UrlResolverService} },
  {path: 'redirect', component: RedirectComponent, canActivate: [AuthGuard]},
  {path: 'info', component: UserInfoComponent, canActivate: [AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
