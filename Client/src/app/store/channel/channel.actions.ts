import { createAction, props } from "@ngrx/store";
import { Channel, Message } from "./channel.state";

const CHANNEL_ACTION_KEY = '[Channel]';

const loadChannels = createAction(`${CHANNEL_ACTION_KEY} Load Channels`);
const loadChannelsSuccess = createAction(`${CHANNEL_ACTION_KEY} Channels load success`, props<{channels : Channel[]}>())
const loadChannelFailure = createAction(`${CHANNEL_ACTION_KEY} Load channels failure`, props<{error : any}>());

const setActiveChannel = createAction(`${CHANNEL_ACTION_KEY} Set active channel`, props<{channelName : string}>());

const createChannel = createAction(`${CHANNEL_ACTION_KEY} Create Channel`, props<{name: string, description: string}>());
const createChannelSuccess = createAction(`${CHANNEL_ACTION_KEY} Create Channel success`);
const createChannelFailure = createAction(`${CHANNEL_ACTION_KEY} Create Channel failure`, props<{error : any}>())

const loadMessages = createAction(`${CHANNEL_ACTION_KEY} Load messages`);
const loadMessagesSucess =createAction(`${CHANNEL_ACTION_KEY} Load messages sucess`, props<{messages: Message[]}>());
const loadMessagesFailure =createAction(`${CHANNEL_ACTION_KEY} Load messages failure`, props<{error : any}>());



export const ChannelActions = {
    loadChannels,
    loadChannelsSuccess,
    loadChannelFailure,
    setActiveChannel,
    createChannel,
    createChannelFailure,
    createChannelSuccess,
    loadMessages,
    loadMessagesSucess,
    loadMessagesFailure
}