export interface xCloudToken {
    market: string;
    language: string;
    token: string;
}

export interface xCloudStreamConfig {
    id: string;
    type: 'home' | 'cloud';
    language: string;
    host: string;
    resolution: 720 | 1080;
}

export interface startStreamResponse {
    sessionId: string;
    sessionPath: string;
    state: 'Provisioning' | any;
}