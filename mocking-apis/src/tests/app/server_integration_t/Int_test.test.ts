import { Reservation } from "../../../app/model/ReservationModel";
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

    let reqToken

    const someReservation: Reservation = {
        id: '',
        room: '123',
        user: 'punit',
        startDate: new Date().toDateString(),
        endDate: new Date().toDateString()
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

    it('should login the user and send back token', async () => {
        const result = await makeAwesomeRequest({
            host: 'localhost',
            port: 8080,
            method: HTTP_METHODS.POST,
            path: '/login'

        }, someUser)

        expect(result.statusCode).toBe(HTTP_CODES.CREATED)
        expect(result.body.token).toBeDefined()
        reqToken = result.body.token
    })

    it('should create a new reservation for the user', async () => {
        const result = await makeAwesomeRequest({
            host: 'localhost',
            port: 8080,
            method: HTTP_METHODS.POST,
            path: '/reservation',
            headers: {
                authorization: reqToken
            }

        }, someReservation)

        expect(result.statusCode).toBe(HTTP_CODES.CREATED)
        expect(result.body.reservationId).toBeDefined
    })
})