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
        const insertObj1 = {
            id: '3333',
            name: 'punit'
        }
        
        const id1 = await sut.insert(insertObj1)

        const actual = await sut.getBy('id', id1)

        expect(actual).toBe(insertObj1)
    })

    test('should find the inserted element by name property',  async() => {
        const insertObj1 = {
            id: '3333',
            name: 'punit'
        }
        const insertObj2 = {
            id: '4444',
            name: 'nidhi'
        }
        const id1 = await sut.insert(insertObj1)
        const id2 = await sut.insert(insertObj2)

        const actual = await sut.findAllBy('name', 'nidhi')
        expect(actual[0].name).toBe('nidhi')
        const expected = [insertObj2]
        expect(actual).toEqual(expected)
    })

    test('should update element property name',  async() => {
        const insertObj = {
            id: '3333',
            name: 'punit'
        }

        const id1 = await sut.insert(insertObj)

        await sut.update(id1, 'name', 'rohit')
        const actual = await sut.getBy('id', id1)
        expect(actual.name).toBe('rohit')
    })

    test('should delete element by id',  async() => {
        const insertObj1 = {
            id: '3333',
            name: 'punit'
        }
        const insertObj2 = {
            id: '444',
            name: 'nidhi'
        }
        const insertObj3 = {
            id: '555',
            name: 'rohit'
        }

        const id1 = await sut.insert(insertObj1)
        const id2 = await sut.insert(insertObj2)
        const id3 = await sut.insert(insertObj3)

        await sut.delete(id3)
        const actual = await sut.getAllElements()
        expect(actual.length).toBe(2)
    })

    test('should findall elements',  async() => {
        const insertObj1 = {
            id: '3333',
            name: 'punit'
        }
        const insertObj2 = {
            id: '444',
            name: 'nidhi'
        }
        const insertObj3 = {
            id: '555',
            name: 'rohit'
        }

        const id1 = await sut.insert(insertObj1)
        const id2 = await sut.insert(insertObj2)
        const id3 = await sut.insert(insertObj3)

        const actual = await sut.getAllElements()
        expect(actual.length).toBe(3)
    })
})