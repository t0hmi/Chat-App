import { createFeatureSelector, createSelector } from "@ngrx/store";
import { UserState } from "./user.state";

const selectUserState = createFeatureSelector<UserState>('user');

const selectIsLoggedIn = createSelector(selectUserState, (state: UserState) => state.isLogged);

const selectLoggedUser = createSelector(selectUserState, (state: UserState) => state.user);

export const UserSelector = {
    selectIsLoggedIn,
    selectLoggedUser
}