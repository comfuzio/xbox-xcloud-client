import XboxApiClient from 'xbox-webapi'
import { WebToken } from '../types/webtoken'

export default class smartglassController {

    async getConsolesList(token:WebToken) {
        const apiClient = new ((XboxApiClient as any) as { default: typeof XboxApiClient }).default({
            uhs: token.uhs,
            token: token.token
        })

        return await apiClient.providers['smartglass'].getConsolesList()
    }
}