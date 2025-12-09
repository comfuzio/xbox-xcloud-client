import type { ReactElement } from 'react';
import './Player.css';

import type { xCloudToken, xCloudStreamConfig, startStreamResponse } from '../types/index';
export type { xCloudToken, startStreamResponse, xCloudStreamConfig };

export interface StreamPlayerProps {
    xCloudStreamConfig: xCloudStreamConfig;
}

export function StreamPlayer({ xCloudStreamConfig }: StreamPlayerProps): ReactElement {
    return (
        <>
            <p>
                Player loaded from <span className='redPlayer'>@greenlight/player/client</span>
                <pre>{JSON.stringify(xCloudStreamConfig, null, 2)}</pre>
            </p>
        </>
    );
}
