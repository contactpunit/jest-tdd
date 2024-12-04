import { RegisterHandler } from '../../../app/handlers/RegisterHandler'
import { Authorizer } from '../../../app/auth/Authorizer'
import { IncomingMessage, ServerResponse } from 'http'
import { getRequestBody } from '../../../app/utils/Utils'

const getRequestBodyMock = jest.fn()

jest.mock('../../../app/utils/Utils', ()=> ({
    getRequestBody: () => getRequestBodyMock()
}))
describe.only('RegisterHandler test suite', () => {
    let sut: RegisterHandler

    const request = {
        method: undefined
    }

    const responseMock = {
        status_code: 0,
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
})