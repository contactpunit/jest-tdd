import { it, expect, describe, vi} from 'vitest'
import { sendDataRequest } from './http'

const fetchFn = vi.fn((url, options) => {
    return new Promise((resolve, reject) => {
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
})
