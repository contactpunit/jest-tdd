import { HTTP_CODES, HTTP_METHODS } from "../../../app/model/ServerModel";
import { Server } from "../../../app/server/Server";
import { makeAwesomeRequest } from "./http_client";

describe('Integration test for Server GET POST calls', () => {

    let server: Server
    beforeAll(async() => {
        server = new Server()
        await server.startServer()
    })

    afterAll(async() => {
        await server.stopServer()
    })

    const someUser = {
        id: '',
        userName: 'someuser',
        password: 'somepass'
    }

    it('should register the user using custom http client lib', async () => {
        const result = await makeAwesomeRequest({
            host: 'localhost',
            port: 8080,
            method: HTTP_METHODS.POST,
            path: '/register'

        }, someUser)

        expect(result.statusCode).toBe(HTTP_CODES.CREATED)
        expect(result.body.userId).toBeDefined()
        
    })
})