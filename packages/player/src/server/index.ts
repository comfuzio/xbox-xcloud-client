import type { xCloudToken, xCloudStreamConfig, startStreamResponse } from '../types/index';
export type { xCloudToken, startStreamResponse, xCloudStreamConfig };

export const ping = () => 'pong';

export const startStream = (xCloudToken:xCloudToken, xCloudStreamConfig:xCloudStreamConfig) => {
    return httpPost(xCloudToken, xCloudStreamConfig, '/v5/sessions/'+xCloudStreamConfig.type+'/play', JSON.stringify({
        clientSessionId: '',
        titleId: (xCloudStreamConfig.type === 'cloud') ? xCloudStreamConfig.id : '',
        systemUpdateGroup: '',
        settings: {
            nanoVersion: 'V3;WebrtcTransport.dll',
            enableOptionalDataCollection: false,
            enableTextToSpeech: false,
            highContrast: 0,
            locale: xCloudStreamConfig.language,
            useIceConnection: false,
            timezoneOffsetMinutes: 120,
            sdkType: 'web',
            osName: 'windows',
        },
        serverId: (xCloudStreamConfig.type === 'home') ? xCloudStreamConfig.id : '',
        fallbackRegionNames: [],
    }))
}

// const httpGet = (url, headers = {}){
//     return new Promise((resolve, reject) => {
//         const deviceInfo = this.getDeviceInfo()

//         fetch(this.getBaseHost()+url, {
//             headers: {
//                 'Accept': 'application/json',
//                 'Content-Type': 'application/json',
//                 'X-Gssv-Client': 'XboxComBrowser',
//                 'X-MS-Device-Info': deviceInfo,
//                 ...(this._config.token !== '' ? { 'Authorization': 'Bearer '+this._config.token } : {}),
//                 ...headers,
//             },
//         }).then(response => {
//             response.json().then(data => {
//                 resolve(data)
//             }).catch((error) => {
//                 if(response.status >= 200 && response.status <= 299){
//                     resolve({ status: response.status })
//                 } else {
//                     reject({ error: error })
//                 }
//             })
//         })
//     })
// }

const httpPost = (xCloudToken:xCloudToken, xCloudStreamConfig:xCloudStreamConfig, url:string, body:string, headers = {}):Promise<any> => {
    return new Promise((resolve, reject) => {
        const deviceInfo = getDeviceInfo(xCloudStreamConfig)

        fetch(xCloudStreamConfig.host+url, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'X-Gssv-Client': 'XboxComBrowser',
                'X-MS-Device-Info': deviceInfo,
                ...(xCloudToken.token !== '' ? { 'Authorization': 'Bearer '+xCloudToken.token } : {}),
                ...headers,
            },
            body: body,
        }).then(response => {
            response.json().then(data => {
                resolve(data)
            }).catch((error) => {
                if(response.status >= 200 && response.status <= 299){
                    resolve({ status: response.status })
                } else {
                    reject({ error: error })
                }
            })
        })
    })
}

const getDeviceInfo = (xCloudStreamConfig:xCloudStreamConfig) => {
    return JSON.stringify({
        'appInfo': {
            'env': {
                'clientAppId':'www.xbox.com',
                'clientAppType':'browser',
                'clientAppVersion':'21.1.98',
                'clientSdkVersion':'8.5.3',
                'httpEnvironment':'prod',
                'sdkInstallId':'',
            },
        },
        'dev': {
            'hw': {
                'make': 'Microsoft',
                'model': 'unknown',
                'sdktype': 'web',
            },
            'os': {
                'name': (xCloudStreamConfig.resolution === 1080) ? 'windows' : 'android',
                'ver': '22631.2715',
                'platform': 'desktop',
            },
            'displayInfo': {
                'dimensions': {
                    'widthInPixels': 1920,
                    'heightInPixels': 1080,
                },
                'pixelDensity': {
                    'dpiX': 2,
                    'dpiY': 2,
                },
            },
            'browser':{
                'browserName':'chrome',
                'browserVersion':'119.0',
            },
        },
    })
}