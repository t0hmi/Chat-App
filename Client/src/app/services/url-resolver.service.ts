import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UrlResolverService implements Resolve<string> {
  constructor() { }

  resolve(route : ActivatedRouteSnapshot, state: RouterStateSnapshot) : Observable<string> {
    return of(route.queryParamMap.get('url') ?? '')
  }
}
