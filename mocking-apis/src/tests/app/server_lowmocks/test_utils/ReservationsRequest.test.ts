import { DataBase } from "../../../../app/data/DataBase"
import { HTTP_CODES, HTTP_METHODS } from "../../../../app/model/ServerModel"
import { Server } from "../../../../app/server/Server"
import * as Utils from "../../../../app/utils/Utils"
import { RequestTestWrapper } from "./RequestTestWrapper"
import { ResponseTestWrapper } from "./ResponseTestWapper"

const requestTestWrapper = new RequestTestWrapper()
const responseTestWrapper = new ResponseTestWrapper()

const fakeServer = {
    listen: jest.fn(),
    close:jest.fn()
}

jest.mock('http', () => ({
    createServer: (cb: Function) => {
        cb(requestTestWrapper, responseTestWrapper)
        return fakeServer
    } 
}))

const someSessionToken = {valid: true}
const reservationId = '55'

const someReservation = {
    id: '',
    room: '123',
    user: 'punit',
    startDate: new Date().toDateString(),
    endDate: new Date().toDateString()
}

jest.mock('../../../../app/data/DataBase')

const getBySpy = jest.spyOn(DataBase.prototype, 'getBy')
const insertSpy = jest.spyOn(DataBase.prototype, 'insert')
const updateSpy = jest.spyOn(DataBase.prototype, 'update')
const getallElementsSpy = jest.spyOn(DataBase.prototype, 'getAllElements')
const requestBodySpy = jest.spyOn(Utils, 'getRequestBody')

describe.only('ReservationHandler test suite', () => {

    afterEach(() => {
        requestTestWrapper.clearAllFields()
        responseTestWrapper.clearAllFields()
    })

    describe('POST test suite', () => {
        it('should be unauthorized if authorization hader not set', async () => {
            requestTestWrapper.url = 'localhost:8080/reservation'
            requestTestWrapper.method = HTTP_METHODS.POST
    
            const server = await new Server()
            await server.startServer()
            await new Promise(process.nextTick)
    
            expect(responseTestWrapper.statusCode).toBe(HTTP_CODES.UNAUTHORIZED)
            expect(responseTestWrapper.body).toBe('Unauthorized operation!')
        })
    
    
        it('should create a reservation for user', async () => {
            requestTestWrapper.url = 'localhost:8080/reservation'
            requestTestWrapper.method = HTTP_METHODS.POST
            requestTestWrapper.headers['authorization'] = '1234'
            getBySpy.mockResolvedValueOnce(someSessionToken)
            requestBodySpy.mockResolvedValueOnce({})
            
            const server = await new Server()
            await server.startServer()
            await new Promise(process.nextTick)
            expect(responseTestWrapper.statusCode).toBe(HTTP_CODES.BAD_REQUEST)
            expect(responseTestWrapper.body).toBe('Incomplete reservation!')
        })
    
        it('should create a new reservation', async () => {
            requestTestWrapper.url = 'localhost:8080/reservation'
            requestTestWrapper.method = HTTP_METHODS.POST
            requestTestWrapper.headers['authorization'] = '1234'
            getBySpy.mockResolvedValueOnce(someSessionToken)
            requestBodySpy.mockResolvedValueOnce(someReservation)
            insertSpy.mockResolvedValueOnce(reservationId)
    
            const server = await new Server()
            await server.startServer()
            await new Promise(process.nextTick)
            expect(responseTestWrapper.statusCode).toBe(HTTP_CODES.CREATED)
            expect(responseTestWrapper.body).toEqual({reservationId: '55'})
        })
    })

    describe('GET test suite', () => {
        it('should get all reservations', async() => {
            requestTestWrapper.url = 'localhost:8080/reservation/all'
            requestTestWrapper.method = HTTP_METHODS.GET
            requestTestWrapper.headers['authorization'] = '1234'
            getBySpy.mockResolvedValueOnce(someSessionToken)
            getallElementsSpy.mockResolvedValueOnce([someReservation])

            const server = await new Server()
            await server.startServer()
            await new Promise(process.nextTick)

            expect(responseTestWrapper.body).toEqual([someReservation])
            expect(responseTestWrapper.statusCode).toBe(HTTP_CODES.OK)
        })

        it('should one specific reservation', async() => {
            requestTestWrapper.url = 'localhost:8080/reservation/111'
            requestTestWrapper.method = HTTP_METHODS.GET
            requestTestWrapper.headers['authorization'] = '1234'
            getBySpy.mockResolvedValueOnce(someSessionToken)
            getBySpy.mockResolvedValueOnce(someReservation)

            const server = await new Server()
            await server.startServer()
            await new Promise(process.nextTick)

            expect(responseTestWrapper.body).toEqual(someReservation)
            expect(responseTestWrapper.statusCode).toBe(HTTP_CODES.OK)
        })
    })

    describe('PUT testcases', () => {
        it('should update a reservation', async () => {
            const id = 111
            requestTestWrapper.url = `localhost:8080/reservation/${id}`
            requestTestWrapper.method = HTTP_METHODS.PUT
            requestTestWrapper.headers['authorization'] = '1234'
            getBySpy.mockResolvedValueOnce(someSessionToken)
            getBySpy.mockResolvedValueOnce(someReservation)
            updateSpy.mockResolvedValue(undefined);

            const changeReserv = {
                user: 'sometheruser',
                startDate: 'someOtherStartDate'
            }

            requestTestWrapper.body = changeReserv

            const server = await new Server()
            await server.startServer()
            await new Promise(process.nextTick)

            expect(responseTestWrapper.statusCode).toBe(HTTP_CODES.OK)
            expect(responseTestWrapper.body).toBe(`Updated ${Object.keys(changeReserv)} of reservation ${id}`)
        })
    })
})