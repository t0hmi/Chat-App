import { state } from "@angular/animations";
import { Action, createReducer, on } from "@ngrx/store";
import { UserActions } from "./user.actions";
import { User, userInitialState, UserState } from "./user.state";

const userReducer = createReducer(
    userInitialState,

    // on(UserActions.loginComplete, (state) => ({...state, isLogged : true})),

    // on(UserActions.logoutConfirmed, (state) => userInitialState),

    on(UserActions.loginSuccess, (state, payload) => {
        
        const user : User = {
            email : payload.email,
            id : payload.id,
            password : payload.password,
            token : payload.token
        }

        return {...state, isLogged : true, user};
    }),

    on(UserActions.tokenDataSuccess, (state, payload) => {
        
        const user : User = {
            email : payload.email,
            id : payload.id,
            password : payload.password,
        }

        return {...state, isLogged : true, user};
    }),
)

export function reducer(state : UserState | undefined, action : Action) {
    return userReducer(state,action)
}