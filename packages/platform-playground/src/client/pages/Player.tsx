import { StreamPlayer } from '@greenlight/player/client';

// import { useState } from 'react';

// import { useQueryClient } from "@tanstack/react-query";
// import { useTRPC } from "../utils/trpc";

export function PlayerPage() {
    // const trpc = useTRPC();
    // const queryClient = useQueryClient();

    console.log('Stramplayer:', StreamPlayer);

    return (
        <>
            {/* <p>Player Page</p> */}
            <StreamPlayer />
        </>
    );
}
