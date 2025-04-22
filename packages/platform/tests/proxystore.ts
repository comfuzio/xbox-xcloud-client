import ProxyStore from '../src/utils/proxystore.js'
import { expect } from 'chai'

describe('ProxyStore', () => {

    describe('new instance', () => {
        it('should create an instance of Proxystore', function(){
            const logger = new ProxyStore()
            expect(logger).to.be.an.instanceOf(ProxyStore)
        })

        it('should create an instance of Proxystore with a token', function(){
            const logger = new ProxyStore({
                "token_type": "Bearer",
                "scope": "XboxLive.signin",
                "expires_in": 3600,
                "ext_expires_in": 3600,
                "access_token": "access_token_test",
                "refresh_token": "refresh_token_test",
                "id_token": "id_token_test"
              })
            expect(logger).to.be.an.instanceOf(ProxyStore)
        })

        // it('should have the correct properties', function(){
        //     const logger = new Logger('test')
        //     // @ts-ignore - _sink is private
        //     expect(logger._sink).to.be.an.instanceOf(Sink)
        //     // logger._sink.data is string[] with value []
        //     // @ts-ignore - _sink.data is private
        //     expect(logger._sink.data).to.be.an('array').that.is.empty
        //     expect(logger.name).to.equal('test')
        // })

        // it('should have the correct values after adding a log entry', function(){
        //     const logger = new Logger('test')
        //     logger.log('test123')
        //     // @ts-ignore - _Store is private
        //     expect(logger._sink).to.be.an.instanceOf(Sink)
        //     // @ts-ignore - _sink.data is private. Value is ['test123']
        //     expect(logger._sink.data[0]).includes({
        //         data: 'test123'
        //     })
        // })
    })
})