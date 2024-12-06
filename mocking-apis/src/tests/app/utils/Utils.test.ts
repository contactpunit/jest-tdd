import { IncomingMessage } from "http"
import { getRequestBody } from "../../../app/utils/Utils"

describe('test GetRequestBody test suite', () => {
    
    const requestMock = {
        on: jest.fn()
    }
    const dataObject = {
        name: 'Punit',
        surName: 'Jain'
    }

    const dataObjectAsString = JSON.stringify(dataObject)

    it ('should return object for valid JSON', async () => {
        requestMock.on.mockImplementation((event, cb) => {
            if (event === 'data') {
                cb(dataObjectAsString)
            } else {
                cb()
            }
        })

        const actual =  await getRequestBody(requestMock as any as IncomingMessage)
        expect(actual).toEqual(dataObject)
    })

    it('should throw an error for invalid JSON', async () => {
        requestMock.on.mockImplementation((event, cb) => {
            if (event === 'data') {
                cb(dataObjectAsString + 'abcd')
            } else {
                cb()
            }
        })

        await expect(getRequestBody(requestMock as any as IncomingMessage)).rejects.toThrow(/SyntaxError: Unexpected token a in JSON at position/)
    })

    it ('should throw an error if unexpected event happeneed', async() => {
        requestMock.on.mockImplementation((event, cb) => {
            if (event === 'error') {
                cb(new Error('Something went wrong!'))
            }
        })

        await expect(getRequestBody(requestMock as any as IncomingMessage)).rejects.toThrow(/Something went wrong!/)
    })
})