import { DataBase } from "../../app/data/DataBase"
import * as IdGenerator from "../../app/data/IdGenerator"

type DatabaseInst = {
    id: string,
    name: string
}

describe('database test suite', () => {
    let sut: DataBase<DatabaseInst>
    const fakeId = '123456'

    beforeEach(() => {
        sut = new DataBase<DatabaseInst>();
        jest.spyOn(IdGenerator, 'generateRandomId' ).mockReturnValue(fakeId)
    })

    test('should return random id after insert operation',  async() => {
        const actual = await sut.insert({
            id: '3333',
            name: 'punit'
        })

        expect(actual).toBe(fakeId)
    })

    test('should get element on 1st insert',  async() => {
        const insertObj = {
            id: '3333',
            name: 'punit'
        }
        const id = await sut.insert(insertObj)

        const actual = await sut.getBy('id', id)

        expect(actual).toBe(insertObj)
    })
})