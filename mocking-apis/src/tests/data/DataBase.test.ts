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

    test('should return random d after insert operation',  async() => {
        const actual = await sut.insert({
            id: '3333',
            name: 'punit'
        })

        expect(actual).toBe(fakeId)
    })
})