
import { Authorizer } from "../../../app/auth/Authorizer"
import { ReservationsDataAccess } from "../../../app/data/ReservationsDataAccess"
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
})