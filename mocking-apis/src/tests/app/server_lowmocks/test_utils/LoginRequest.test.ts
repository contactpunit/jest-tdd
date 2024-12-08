import { DataBase } from "../../../../app/data/DataBase";
import { HTTP_CODES, HTTP_METHODS } from "../../../../app/model/ServerModel";
import { Server } from "../../../../app/server/Server";
import { RequestTestWrapper } from "./RequestTestWrapper";
import { ResponseTestWrapper } from "./ResponseTestWapper";

const requestTestWrapper = new RequestTestWrapper()
const responseTestWrapper = new ResponseTestWrapper()

const fakeServer = {
    listen: jest.fn(),
    close: jest.fn()
}

jest.mock('../../../../app/data/DataBase')

jest.mock('http', () => ({
    createServer: (cb) => {
        cb(requestTestWrapper, responseTestWrapper)
        return fakeServer
    }
}))

describe.skip('LoginHandler test suite', () => {

    const insertSpy = jest.spyOn(DataBase.prototype, 'insert')
    const getBySpy = jest.spyOn(DataBase.prototype, 'getBy')

    const someAccount = {
        id: '',
        userName: 'someusername',
        password: 'somepassword'
    }

    const wrongAccount = {
        id: '',
        userName: 'someusername',
        password: 'correctpassword'
    }

    const someTokenId = '123456'

    beforeEach(()=>{
        requestTestWrapper.headers['user-agent'] = 'jest tests'
    })

    afterEach(() => {
        requestTestWrapper.clearAllFields()
        responseTestWrapper.clearAllFields()
        jest.clearAllMocks()
    })

    it('should login with correct creds', async() => {
        requestTestWrapper.url = 'localhost:8080/login'
        requestTestWrapper.method = HTTP_METHODS.POST
        requestTestWrapper.body = {
            id: '',
            userName: 'someusername',
            password: 'somepassword'
        }
        getBySpy.mockResolvedValueOnce(someAccount)
        insertSpy.mockResolvedValueOnce(someTokenId)

        const server = await new Server()
        await server.startServer()
        await new Promise(process.nextTick)

        expect(responseTestWrapper.statusCode).toBe(HTTP_CODES.CREATED)
        expect(responseTestWrapper.body).toEqual({token: someTokenId})
    })

    it('should fail with incorrect creds', async () => {
        requestTestWrapper.url = 'localhost:8080/login'
        requestTestWrapper.method = HTTP_METHODS.POST
        requestTestWrapper.body = {
            id: '',
            userName: 'someusername',
            password: 'somepassword'
        }
        getBySpy.mockResolvedValueOnce(wrongAccount)

        const server = await new Server()
        await server.startServer()
        await new Promise(process.nextTick)

        expect(responseTestWrapper.statusCode).toBe(HTTP_CODES.NOT_fOUND)
        expect(responseTestWrapper.body).toEqual('wrong username or password')

    })

    it('should fail with bad request', async () => {
        requestTestWrapper.url = 'localhost:8080/login'
        requestTestWrapper.method = HTTP_METHODS.POST
        requestTestWrapper.body = {
            id: '',
            userName: 'someusername'
        }

        const server = await new Server()
        await server.startServer()
        await new Promise(process.nextTick)

        expect(responseTestWrapper.statusCode).toBe(HTTP_CODES.BAD_REQUEST)
        expect(responseTestWrapper.body).toBe('userName and password required')

    })
})