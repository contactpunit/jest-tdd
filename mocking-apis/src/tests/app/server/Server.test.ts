import { Authorizer } from "../../../app/auth/Authorizer"
import { ReservationsDataAccess } from "../../../app/data/ReservationsDataAccess"
import { LoginHandler } from "../../../app/handlers/LoginHandler"
import { RegisterHandler } from "../../../app/handlers/RegisterHandler"
import { ReservationsHandler } from "../../../app/handlers/ReservationsHandler"
import { HTTP_CODES } from "../../../app/model/ServerModel"
import { Server } from "../../../app/server/Server"

jest.mock('../../../app/auth/Authorizer')
jest.mock('../../../app/data/ReservationsDataAccess')
jest.mock('../../../app/handlers/LoginHandler')
jest.mock('../../../app/handlers/RegisterHandler')
jest.mock('../../../app/handlers/ReservationsHandler')

const requestMock = {
    url: undefined,
    headers: {
        'user-agent': 'jest-testing'
    }
}

const responseMock = {
    end: jest.fn(),
    writeHead: jest.fn()
}

const ServerMock = {
    listen: jest.fn(),
    close: jest.fn()
}

jest.mock('http', () => ({
    createServer: (cb: Function) => {
        cb(requestMock, responseMock)
        return ServerMock
    }
}))

describe('Server test suite', () => {
    let sut: Server

    beforeEach(() => {
        sut = new Server()
        expect(Authorizer).toHaveBeenCalledTimes(1)
        expect(ReservationsDataAccess).toHaveBeenCalledTimes(1)
    })

    afterEach(() => {
        jest.clearAllMocks()
    })

    it('should start the server', async () => {
        await sut.startServer()
        expect(ServerMock.listen).toHaveBeenCalledWith(8080)
        expect(responseMock.end).toHaveBeenCalled()
    })

    it('should register request', async () => {
        requestMock.url = 'localhost:8080/register'
        const handleRequestSpy = jest.spyOn(RegisterHandler.prototype, 'handleRequest')

        await sut.startServer()
        expect(handleRequestSpy).toHaveBeenCalledTimes(1)
        expect(RegisterHandler).toHaveBeenCalledWith(requestMock, responseMock, expect.any(Authorizer))
    })

    it('should make login handler request with correct args', async () => {
        requestMock.url = 'localhost:8080/login'
        const loginSpy = jest.spyOn(LoginHandler.prototype, 'handleRequest')

        await sut.startServer()
        expect(loginSpy).toHaveBeenCalledTimes(1)
        expect(LoginHandler).toHaveBeenCalledWith(requestMock, responseMock, expect.any(Authorizer))
    })

    it('should make reservation call with correct args', async() => {
        requestMock.url = 'localhost:8080/reservation'
        const reservationSpy = jest.spyOn(ReservationsHandler.prototype, 'handleRequest')

        await sut.startServer()
        expect(reservationSpy).toHaveBeenCalledTimes(1)
        expect(ReservationsHandler).toHaveBeenCalledWith(
            requestMock,
            responseMock,
            expect.any(Authorizer),
            expect.any(ReservationsDataAccess)
        )
    })

    it('for invalid route authoriation not called', async () => {
        requestMock.url = 'localhost:8080/test'
        const validateSpy = jest.spyOn(Authorizer.prototype, 'validateToken')

        await sut.startServer()
        expect(validateSpy).toHaveBeenCalledTimes(0)
        expect(validateSpy).not.toHaveBeenCalled()
    })

    it('should fail while doing seome invalid reservation and error is handled', async () => {
        requestMock.url = 'localhost:8080/reservation'
        const reservationSpy = jest.spyOn(ReservationsHandler.prototype, 'handleRequest')
        reservationSpy.mockRejectedValueOnce(
            new Error('invalid reservation!')
        )

        await sut.startServer()
        expect(responseMock.writeHead).toHaveBeenCalledWith(
            HTTP_CODES.INTERNAL_SERVER_ERROR, 
            JSON.stringify('Internal server error: invalid reservation!'))
    })
})