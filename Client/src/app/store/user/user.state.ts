export interface UserState {
    isLogged : boolean,
    user : User | null,
    errorMessage : string | null
}


export const userInitialState : UserState  = {
    isLogged : false,
    user : {},
    errorMessage : ''
}

export interface User {
    id?: number,
    email?: string,
    password?: string,
    token?: string
} 