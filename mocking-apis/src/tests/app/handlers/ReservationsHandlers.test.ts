import { IncomingMessage, ServerResponse } from "http";
import { ReservationsHandler } from "../../../app/handlers/ReservationsHandler";
import { ReservationsDataAccess } from "../../../app/data/ReservationsDataAccess";
import { Authorizer } from "../../../app/auth/Authorizer";
import { HTTP_CODES, HTTP_METHODS } from "../../../app/model/ServerModel";
import { Reservation } from "../../../app/model/ReservationModel";
import { mock } from "node:test";

const getRequestBodyMock = jest.fn()

jest.mock('../../../app/utils/Utils', () => ({
    getRequestBody: () => getRequestBodyMock()
}))

describe('ReservationHandlers test suite', () => {
    let sut: ReservationsHandler
    
    const request = {
        method: undefined,
        headers: {
            authorization: undefined
        },
        url: undefined
    }

    const responseMock = {
        statusCode: 0,
        write: jest.fn(),
        writeHead: jest.fn()
    } 

    const authorizerMock = {
        validateToken: jest.fn()
    }

    const reservation1: Reservation = {
        id: '1111',
        room: 'someroom',
        user: 'someuser',
        startDate: new Date().toDateString(),
        endDate: new Date().toDateString()
    }

    const createReservationMock = jest.fn()
    const getAllReservationsMock = jest.fn()
    const getReservationMock = jest.fn()
    const updateReservationMock = jest.fn()
    const deleteReservationMock = jest.fn()

    const reservationsDataAccessMock = {
        createReservation: () => createReservationMock(),
        getAllReservations: () => getAllReservationsMock(),
        getReservation: () => getReservationMock(),
        updateReservation: () => updateReservationMock(),
        deleteReservation: () => deleteReservationMock()
    }

    beforeEach( () => {
        sut = new ReservationsHandler(
            request as any as IncomingMessage,
            responseMock as any as ServerResponse, 
            authorizerMock as any as Authorizer, 
            reservationsDataAccessMock as any as ReservationsDataAccess
        )
        request.headers.authorization = '1234567'
        authorizerMock.validateToken.mockResolvedValueOnce(true)

    })

    afterEach(() => {
        jest.clearAllMocks()
    })

    it('should error out of request is not authorized', async() => {
        request.headers.authorization = undefined
        await sut.handleRequest()
        expect(responseMock.statusCode).toEqual(HTTP_CODES.UNAUTHORIZED)
        expect(responseMock.write).toHaveBeenCalledWith(JSON.stringify('Unauthorized operation!'))
    })

    describe('HTTP POST tests', () => {

        let someid;

        beforeEach(() => {
            request.headers.authorization = '12345'
            request.method = HTTP_METHODS.POST
            someid = '2222'
        })

        it('should call handlePost and make reservation', async () => {
            getRequestBodyMock.mockResolvedValue(reservation1)
            createReservationMock.mockResolvedValue(someid)
            await sut.handleRequest()

            expect(responseMock.statusCode).toBe(HTTP_CODES.CREATED)
            expect(responseMock.writeHead).toHaveBeenCalledWith(HTTP_CODES.CREATED, { 'Content-Type': 'application/json' })
            expect(responseMock.write).toHaveBeenCalledWith(JSON.stringify({ reservationId: someid }))
        })

        it('should call handlePost and fail for invalid reservation with BAD_REQUEST', async () => {
            getRequestBodyMock.mockResolvedValue({})
            await sut.handleRequest()

            expect(responseMock.statusCode).toBe(HTTP_CODES.BAD_REQUEST)
            expect(responseMock.write).toHaveBeenCalledWith(JSON.stringify('Incomplete reservation!'))
        })
    })

    describe('HTTP GET tests', () => {
        beforeEach(() => {
            request.headers.authorization = '12345'
            authorizerMock.validateToken.mockResolvedValueOnce(true)
            request.method = HTTP_METHODS.GET
        })

        afterEach(()=> {
            jest.clearAllMocks()
        })

        it('should get all reservations when all is passed', async () => {
            request.url = '/reservations/all'
            getAllReservationsMock.mockResolvedValueOnce([reservation1])

            await sut.handleRequest()
            expect(responseMock.writeHead).toHaveBeenCalledWith(HTTP_CODES.OK, { 'Content-Type': 'application/json' })
            expect(responseMock.write).toHaveBeenCalledWith(JSON.stringify([reservation1]))
        })

        it('should get all reservations when no id passed', async () => {
            request.url = '/reservations/'

            await sut.handleRequest()
            expect(responseMock.statusCode).toBe(HTTP_CODES.BAD_REQUEST)
            expect(responseMock.write).toHaveBeenCalledWith(JSON.stringify(
                'Please provide an ID!'
            ))
        })
    })
})