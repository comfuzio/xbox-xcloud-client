import type { ReactElement } from 'react';
import './Player.css';

export function StreamPlayer(): ReactElement {
    return (
        <>
            <p>Player loaded from <span className='redPlayer'>@greenlight/player/client</span></p>
        </>
    );
}
