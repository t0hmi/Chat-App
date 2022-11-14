import { createAction, props } from "@ngrx/store";

const USER_ACTION_KEY = '[User]';

// const login = createAction(`${USER_ACTION_KEY} Login init`);
// const loginComplete = createAction(`${USER_ACTION_KEY} Login complete`);
// const loginSuccess = createAction(`${USER_ACTION_KEY} [API] Login success`);
// const loginFailure = createAction(`${USER_ACTION_KEY} [API] Login failure`);
// const loginCheck = createAction(`${USER_ACTION_KEY} Login check`);
// const logout = createAction(`${USER_ACTION_KEY} Logout init`);
// const logoutCancelled = createAction(`${USER_ACTION_KEY} Logout Cancelled`);
// const logoutConfirmed = createAction(`${USER_ACTION_KEY} Logout Completed`);

// export const UserActions = {
//     login,
//     loginComplete,
//     loginFailure,
//     loginCheck,
//     loginSuccess,
//     logout,
//     logoutCancelled,
//     logoutConfirmed
// }  

const login = createAction(`${USER_ACTION_KEY} Login init`, props<{email : string, password : string}>());
const loginSuccess = createAction(`${USER_ACTION_KEY} Login success`, props<{email: string, password: string, token : string, id : number}>());
const loginFailure = createAction(`${USER_ACTION_KEY} Login failure`, props<{error : any}>());

const tokenData  = createAction(`${USER_ACTION_KEY} Get token data init`); 
const tokenDataSuccess  = createAction(`${USER_ACTION_KEY} Get token data success`, props<{email: string, password: string, id : number}>()); 
const tokenDataFailure= createAction(`${USER_ACTION_KEY} Get token data failure`, props<{error : any}>()); 

const register = createAction(`${USER_ACTION_KEY} Register init`, props<{email : string, password : string}>());
const registerSuccess = createAction(`${USER_ACTION_KEY} Register success`)
const registerFailure = createAction(`${USER_ACTION_KEY}  Register failure`, props<{error : any}>()); 


export const UserActions = {
    login,
    loginSuccess,
    loginFailure,
    tokenData,
    tokenDataSuccess,
    tokenDataFailure,
    register,
    registerFailure,
    registerSuccess
}