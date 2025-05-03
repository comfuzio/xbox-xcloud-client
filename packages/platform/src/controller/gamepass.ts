import { xHomeToken } from '../types/webtoken'
import { TRPCError } from '@trpc/server'

import Http from '../lib/http.js'
import TitleManager from '../lib/titlemanager.js'

export default class gamepassController {
    private _titleManager: TitleManager = new TitleManager()
    private _httpClient = new Http()

    async getTitles(token:xHomeToken) {
        if(token.market === '' || token.token === '' || token.region === '') {
            throw new TRPCError({
                code: 'UNAUTHORIZED',
                message: '(xHomeToken) No correct token provided',
            });
        }

        const titles = await this._httpClient.getRequest('weu.core.gssv-play-prod.xboxlive.com', '/v2/titles', {
            'Authorization': `Bearer ${token.token}`,
        })

        const queueTitles:string[] = titles.data.results.map((title:any) => {
            return title.details.productId
        })

        this._titleManager.queueItems(queueTitles)

        return await this._titleManager.processQueueAndReturn(queueTitles, token.token)
    }
}