import { it, expect, describe, vi} from 'vitest'
import { sendDataRequest } from './http'
import { HttpError } from './errors'

const fetchFn = vi.fn((url, options) => {
    return new Promise((resolve, reject) => {
        try {
            if (!options.body) {
                return reject('body either not available or not a JSON')
            }
            JSON.parse(options.body)
        } catch(err) {
            return reject('body either not available or not a JSON')
        }
        const result = {
            ok: true,
            json() {
                return new Promise((resolve, reject) => {
                    const respData = {'name': 'Punit'}
                    resolve(respData)
                })
            }
        }
        resolve(result)
    })
})

vi.stubGlobal('fetch', fetchFn)

describe('sendDataRequest()', ()=> {

    it('sendDataRequest should make httprequest and return data', () => {
        const data = {key: 'test'}
        const result = {'name': 'Punit'}
        return expect(sendDataRequest(data)).resolves.toEqual(result)
    })

    it('should convert provided data to JSON using stringify an dthen send', () => {
        const data = {key: 'test'}
        const result = {'name': 'Punit'}
        return expect(sendDataRequest(data)).resolves.toEqual(result)
    })

    it('should check if fetch is converting the body to JSON', async () => {
        const data = {key: 'test'}
        let errMessage
        try {
            await sendDataRequest(data)
        } catch(err) {
            errMessage = err
        }
        expect(errMessage).not.toBe('body either not available or not a JSON')
    })

    it('should throw an HttpError response incase of not OK', () => {
        const data = {'key': 'test'}
        fetchFn.mockImplementationOnce((url, options) => {
            return new Promise((resolve, reject) => {
                const result = {
                    ok: false,
                    json() {
                        return new Promise((resolve, reject) => {
                            const respData = {'name': 'Punit'}
                            resolve(respData)
                        })
                    }
                }
                resolve(result)
            })
        })

        expect(sendDataRequest(data)).rejects.toBeInstanceOf(HttpError)
    })
})
