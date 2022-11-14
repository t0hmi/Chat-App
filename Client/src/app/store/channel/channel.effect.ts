import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Action, Store } from "@ngrx/store";
import { catchError, map, of, switchMap, withLatestFrom } from "rxjs";
import { ChannelService } from "src/app/services/channel/channel.service";
import { ChannelActions } from "./channel.actions";
import { ChannelSelector } from "./channel.selector";
import { Message } from "./channel.state";

@Injectable()
export class ChannelEffect {
    constructor(private actions$: Actions, private channelService : ChannelService, private store : Store){}

    fetchChannels$ = createEffect(() =>
        this.actions$.pipe(
            ofType(ChannelActions.loadChannels),
            switchMap((_) => 
                this.channelService.getChannels().pipe(
                    switchMap(data => [ChannelActions.loadChannelsSuccess({channels : data}), ChannelActions.setActiveChannel({channelName : data[0].name as string})]),
                    catchError(err => of(ChannelActions.loadChannelFailure({error: err})))
                )
            )
        )
    );

    createChannel$ = createEffect(() => 
        this.actions$.pipe(
            ofType(ChannelActions.createChannel),
            switchMap((payload) =>
                this.channelService.createChannel(payload.name, payload.description).pipe(
                    switchMap(data => [ChannelActions.createChannelSuccess(), ChannelActions.loadChannels()]),
                    catchError(err => of(ChannelActions.loadChannelFailure(err)))
                )
            )
        )
    );

    fetchMessages$ = createEffect(() =>
        this.actions$.pipe(
            ofType(ChannelActions.setActiveChannel),
            withLatestFrom(this.store.select(ChannelSelector.selectActiveChannel)),
            switchMap(([, channel]) => 
                this.channelService.getMessages(channel.id).pipe(
                    map(data => ChannelActions.loadMessagesSucess({messages : data.messages})),
                    catchError(err => of(ChannelActions.loadMessagesFailure({error: err})))
                )
            )
        )
    );
}