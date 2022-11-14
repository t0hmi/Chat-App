import { ChannelsState } from "./channel/channel.state";
import { UserState } from "./user/user.state";

export interface RootState {
    user: UserState,
    channels: ChannelsState
}