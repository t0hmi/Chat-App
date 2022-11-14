import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { CookieService } from "ngx-cookie-service";
import { catchError, map, of, switchMap } from "rxjs";
import { AuthService } from "src/app/services/auth.service";
import { UserActions } from "./user.actions";

@Injectable()
export class UserEffect {
    constructor(private actions$: Actions, private authService : AuthService, private cookies : CookieService) {}

    login$ = createEffect(() =>
        this.actions$.pipe(
            ofType(UserActions.login),
            switchMap((payload) => 
                this.authService.login(payload.email, payload.password).pipe(
                    map(data => {
                        this.cookies.set('token', data.token, 0.25);
                        return UserActions.loginSuccess({email : data.user.email, id: data.user.id, password: data.user.password, token: data.token});
                    }), 
                    catchError(err => of(UserActions.loginFailure(err)))
                )
            )
        )
    )

    register$ = createEffect(() => 
        this.actions$.pipe(
            ofType(UserActions.register),
            switchMap((payload) =>
                this.authService.register(payload.email, payload.password).pipe(
                    map(_ => UserActions.registerSuccess()),
                    catchError(err => of(UserActions.registerFailure(err)))
                )
            )
        )
    )

    tokenData$ = createEffect(() => 
     this.actions$.pipe(
        ofType(UserActions.tokenData),
        switchMap(() => 
            this.authService.getUserData().pipe(
                map(data => {
                    return UserActions.tokenDataSuccess({email: data.email, id: data.id, password: data.password});
                })
            )
        )
     )               
    )
}