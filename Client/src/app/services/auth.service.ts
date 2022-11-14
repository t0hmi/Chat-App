import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http : HttpClient, private cookies : CookieService, private router: Router  ) { }
  
  private server_url = 'http://localhost:8000';

  private chat_app_url = 'https://localhost:7257/users/';

  loginWithGithub() : Observable<any> {
    return this.http.get('https://gihub.com/login/oauth/authorize?client_id=4e925949188f9c21c348');
  }

  getUserDetails() {
    return this.http.get(this.server_url + '/github/user')
  }

  getAccessToken(code : string) {
    return this.http.get(this.server_url + '/github/access_token', {params : new HttpParams().set('code', code)});
  }

  login(email: string, password: string) : Observable<{token : string, user : {id: number, email:string, password: string}}> {
    return this.http.post<{token : string, user : {id: number, email:string, password: string}}>(`${this.chat_app_url}login`, {email, password}).pipe(tap(() => this.router.navigate(['/'])));
  }

  register(email: string, password: string) : Observable<{email: string, password: string}> {
    return this.http.post<{email: string, password: string}>(this.chat_app_url, {email, password}).pipe(tap(() => this.router.navigate(['/login'])));
  }

  getUserData() : Observable<any> {
    const token = this.cookies.get('token');
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    })
    return this.http.get(this.chat_app_url + 'token/' + token, {headers : headers});
  }

  logout() {
    this.cookies.delete('token');
    this.router.navigateByUrl('/login')
  }

  getToken() : string {
    return this.cookies.get('token');
  }
}
