import { ActionReducerMap, MetaReducer } from "@ngrx/store";
import { RootState } from "./index.state";
import * as userReducer from './user/user.reducer'; 
import * as channelReducer from './channel/channel.reducer';

export const reducers : ActionReducerMap<RootState> = {
    user : userReducer.reducer,
    channels : channelReducer.reducer
};

export const metaReducers : MetaReducer<RootState>[] = [];
