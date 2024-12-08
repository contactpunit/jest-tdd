
import { DataBase } from "../../../../app/data/DataBase"
import { HTTP_CODES, HTTP_METHODS } from "../../../../app/model/ServerModel"
import { Server } from "../../../../app/server/Server"
import { RequestTestWrapper } from "./RequestTestWrapper"
import { ResponseTestWrapper } from "./ResponseTestWapper"

// jest.mock('../../../../app/data/DataBase')

const requestTestWrapper = new RequestTestWrapper()
const responseTestWrapper = new ResponseTestWrapper()
const fakeServer = {
    listen: () => {},
    close: () => {}
}

jest.mock('http', () => ({
    createServer: (cb) => {
        cb(requestTestWrapper, responseTestWrapper)
        return fakeServer
    }
}))

describe('RegisterRequest test suite', () => {
    afterEach(() => {
        requestTestWrapper.clearAllFields()
        responseTestWrapper.clearAllFields()
    })

    it('should register new users', async() => {
        requestTestWrapper.method = HTTP_METHODS.POST
        requestTestWrapper.body = {
            userName: 'someusername',
            password: 'somepassword'
        }
        requestTestWrapper.url = 'localhost:8080/register'
        jest.spyOn(DataBase.prototype, 'insert').mockResolvedValueOnce('12345')

        const server = await new Server()
        await server.startServer()
        await new Promise(process.nextTick)

        expect(responseTestWrapper.statusCode).toBe(HTTP_CODES.CREATED)
        expect(responseTestWrapper.body).toEqual(expect.objectContaining({
            userId: expect.any(String)
        }))
        expect(responseTestWrapper.body).toEqual({userId: '12345'})
        
    })
})