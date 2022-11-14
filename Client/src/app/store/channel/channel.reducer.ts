import { createReducer, on, Action } from "@ngrx/store";
import { ChannelActions } from "./channel.actions";
import { Channel, channelInitialState, ChannelsState } from "./channel.state";

const channelReducer = createReducer(
    channelInitialState,

    on(ChannelActions.loadChannelsSuccess, (state: ChannelsState, payload) =>
        ({...state, channels : payload.channels})
    ),

    on(ChannelActions.setActiveChannel, (state: ChannelsState, payload) => {
        const channel : Channel | undefined = state.channels.find(c => c.name === payload.channelName); 
        return channel ?  {...state, activeChannel : channel} : state
    } 
    ),

    on(ChannelActions.loadMessagesSucess, (state: ChannelsState, payload) => ({...state, messages : payload.messages}))
);

export function reducer(state: ChannelsState | undefined, action : Action) {
    return channelReducer(state,action)
}