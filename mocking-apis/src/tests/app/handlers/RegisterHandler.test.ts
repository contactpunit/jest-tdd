import { RegisterHandler } from '../../../app/handlers/RegisterHandler'
import { Authorizer } from '../../../app/auth/Authorizer'
import { IncomingMessage, ServerResponse } from 'http'
import { HTTP_CODES, HTTP_METHODS } from '../../../app/model/ServerModel'
import { Account } from '../../../app/model/AuthModel'

const getRequestBodyMock = jest.fn()

jest.mock('../../../app/utils/Utils', ()=> ({
    getRequestBody: () => getRequestBodyMock()
}))

describe.only('RegisterHandler test suite', () => {
    let sut: RegisterHandler

    const someAccount: Account = {
        id: '',
        userName: 'someusername',
        password: 'somepassword'
    }

    const someid = '1234'

    const request = {
        method: undefined
    }

    const responseMock = {
        statusCode: 0,
        writeHead: jest.fn(),
        write: jest.fn()
    }
    const authorizerMock = {
        registerUser: jest.fn()
    }

    beforeEach(() => {
        sut = new RegisterHandler(request as IncomingMessage, responseMock as any as ServerResponse, authorizerMock as any as Authorizer)
    })

    afterEach(() => {
        jest.clearAllMocks()
    })

    it('registers an account nand returns an id', async () => {
        request.method = HTTP_METHODS.POST
        getRequestBodyMock.mockResolvedValueOnce(someAccount)
        authorizerMock.registerUser.mockResolvedValueOnce(someid)

        await sut.handleRequest()
        expect(responseMock.statusCode).toBe(HTTP_CODES.CREATED)
        expect(responseMock.writeHead).toHaveBeenCalledWith(HTTP_CODES.CREATED, { 'Content-Type': 'application/json' })
        expect(responseMock.write).toHaveBeenCalledWith(JSON.stringify({userId: someid}))
    })

    it('should fail if no valid username and password provided',async () => {
        request.method = HTTP_METHODS.POST
        getRequestBodyMock.mockResolvedValueOnce({})
        await sut.handleRequest()
        expect(responseMock.statusCode).toBe(HTTP_CODES.BAD_REQUEST)
        expect(responseMock.writeHead).toHaveBeenCalledWith(HTTP_CODES.BAD_REQUEST, { 'Content-Type': 'application/json' })
        expect(responseMock.write).toHaveBeenCalledWith(JSON.stringify('userName and password required'))
    })

    it('should do nothing with unsupported HTTP methods', async() => {
        request.method = 'GET'
        await sut.handleRequest()

        expect(responseMock.statusCode).toBe(400)
        expect(responseMock.write).not.toBeCalled()
        expect(responseMock.writeHead).not.toBeCalled()
    })
})