import { User, UserState } from "../user/user.state"

export interface Channel {
    id?: number,
    name?: string,
    description: string 
}

export interface Message {
    id : number,
    creationDate : string,
    email : string,
    message : string
}

export interface ChannelsState {
    channels: Channel[],
    activeChannel : Channel,
    users: User[],
    messages: Message[]
}

export const channelInitialState : ChannelsState = {
    channels: [],
    activeChannel : {} as Channel,
    users: [],
    messages :[]
} 