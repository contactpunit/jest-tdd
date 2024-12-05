import { IncomingMessage, ServerResponse } from "http";
import { ReservationsHandler } from "../../../app/handlers/ReservationsHandler";
import { ReservationsDataAccess } from "../../../app/data/ReservationsDataAccess";
import { Authorizer } from "../../../app/auth/Authorizer";
import { HTTP_CODES } from "../../../app/model/ServerModel";

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
        write: jest.fn()
    } 

    const authorizerMock = {
        validateToken: jest.fn()
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
        
    })
})