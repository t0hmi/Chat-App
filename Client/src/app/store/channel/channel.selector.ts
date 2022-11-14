import { createFeatureSelector, createSelector } from "@ngrx/store";
import { ChannelsState } from "./channel.state";

const selectChannelsState = createFeatureSelector<ChannelsState>('channels');

const selectChannels = createSelector(selectChannelsState, (state: ChannelsState) => state.channels);

const selectActiveChannel = createSelector(selectChannelsState, (state: ChannelsState) => state.activeChannel);

const selectActiveChannelName = createSelector(selectChannelsState, (state: ChannelsState) => state.activeChannel.name);

const selectChannelUsers = createSelector(selectChannelsState, (state: ChannelsState) => state.users);

const selectMappedChannel = createSelector(selectChannelsState, (state :ChannelsState) => {
    return state.channels.map(channel => {
        const name = channel.name;
        const key = channel.name?.split(' ').slice(0,2).map(s => s[0]).join('');
        return {key, name}
    })
})

const selectChannelMessages = createSelector(selectChannelsState, (state: ChannelsState) => 
    (state.messages.map(m => ({...m,creationDate : new Date(m.creationDate)})))
)

export const ChannelSelector = {
    selectActiveChannel,
    selectChannels,
    selectChannelUsers,
    selectMappedChannel,
    selectActiveChannelName,
    selectChannelMessages
}