import { IncomingMessage, ServerResponse } from "http";
import { LoginHandler } from "../../../app/handlers/LoginHandler";
import { Authorizer } from "../../../app/auth/Authorizer";
import { Account } from "../../../app/model/AuthModel";
import { HTTP_CODES, HTTP_METHODS } from "../../../app/model/ServerModel";
import exp from "constants";

const mockgetRequestBody = jest.fn()

jest.mock('../../../app/utils/Utils', () => ({
    getRequestBody: () => mockgetRequestBody()
}))
describe('LoginHandler class test suite', () => {
    let sut: LoginHandler

    const request = {
        method: undefined
    }
    
    const someAccount: Account = {
        id: '',
        userName: 'someUser',
        password: 'somepass'
    }

    const someToken = '12345'

    const mockResponse = {
        statusCode: 0,
        writeHead: jest.fn(),
        write: jest.fn()
    }
    
    const mockAuthorizer = {
        login: jest.fn()
    }
    
    beforeEach(() => {
        sut = new LoginHandler(
            request as any as IncomingMessage,
            mockResponse as any as ServerResponse,
            mockAuthorizer as any as Authorizer
        )
    })

    afterEach(() => {
        jest.clearAllMocks()
    })

    it('handleRequest method should create and return a token', async() => {
        request.method = HTTP_METHODS.POST
        mockgetRequestBody.mockResolvedValueOnce(someAccount)
        mockAuthorizer.login.mockResolvedValueOnce(someToken)
        await sut.handleRequest()
        expect(mockResponse.statusCode).toBe(HTTP_CODES.CREATED)
        expect(mockResponse.writeHead).toHaveBeenCalledWith(HTTP_CODES.CREATED, { 'Content-Type': 'application/json' })
        expect(mockResponse.write).toHaveBeenCalledWith(JSON.stringify({token: someToken}))
        expect(mockAuthorizer.login).toHaveBeenCalledWith(someAccount.userName, someAccount.password)
    })

    it('handleRequest method should return NOT_FOUND for incorrect password', async() => {
        request.method = HTTP_METHODS.POST
        mockgetRequestBody.mockResolvedValueOnce(someAccount)
        mockAuthorizer.login.mockResolvedValueOnce(undefined)
        await sut.handleRequest()
        expect(mockResponse.statusCode).toBe(HTTP_CODES.NOT_fOUND)
        expect(mockResponse.write).toHaveBeenCalledWith(JSON.stringify('wrong username or password'))
    })

    it('handleRequest method should return BAD_REQUEST for invalid account', async() => {
        request.method = HTTP_METHODS.POST
        mockgetRequestBody.mockResolvedValueOnce({})
        await sut.handleRequest()
        expect(mockResponse.statusCode).toBe(HTTP_CODES.BAD_REQUEST)
        expect(mockResponse.writeHead).toHaveBeenCalledWith(HTTP_CODES.BAD_REQUEST, { 'Content-Type': 'application/json' })
        expect(mockResponse.write).toHaveBeenCalledWith(JSON.stringify('userName and password required'))
    })
})