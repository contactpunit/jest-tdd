import { IncomingMessage, ServerResponse } from "http";
import { LoginHandler } from "../../../app/handlers/LoginHandler";
import { Authorizer } from "../../../app/auth/Authorizer";
import { Account } from "../../../app/model/AuthModel";
import { getRequestBody } from "../../../app/utils/Utils";
import { HTTP_METHODS } from "../../../app/model/ServerModel";

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
    
    const mockgetRequestBody = jest.fn()
    
    jest.mock('../../../app/utils/Utils', () => ({
        getRequestBody: mockgetRequestBody
    }))

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

    it('handleRequest method should create and return a token', () => {
        request.method = HTTP_METHODS.POST
        mockgetRequestBody.mockResolvedValueOnce(someAccount)
        mockAuthorizer.login.mockResolvedValueOnce(someToken)
    })
})