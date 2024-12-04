import { DataBase } from "../../../app/data/DataBase"
import { UserCredentialsDataAccess } from "../../../app/data/UserCredentialsDataAccess"
import { Account } from "../../../app/model/AuthModel"

const insertMock = jest.fn()
const getByMock = jest.fn()

jest.mock('../../../app/data/Database', () => {
    return {
        DataBase: jest.fn().mockImplementation(() => {
            return {
                insert: insertMock,
                getBy: getByMock
            }
        })
    }
})

describe('UserCredentialsDataAccess test suite', () => {
    let sut : UserCredentialsDataAccess

    const sampleUserAccount: Account = {
        id: '',
        userName: 'punit',
        password: 'abcd'
    }

    const fakeId = '123456'

    beforeEach(() => {
        sut = new UserCredentialsDataAccess()
        expect(DataBase).toHaveBeenCalledTimes(1)
    })

    afterEach(() => {
        jest.clearAllMocks()
    })

    it('should add user and return id', async() => {
        insertMock.mockResolvedValueOnce(fakeId)
        const actual = await sut.addUser(sampleUserAccount)
        expect(actual).toBe(fakeId)
        expect(insertMock).toBeCalledWith(sampleUserAccount)
    })

    it('should get use by Id', async() => {
        getByMock.mockResolvedValueOnce(sampleUserAccount)
        const actual = await sut.getUserById(fakeId)
        expect(actual).toEqual(sampleUserAccount)
        expect(getByMock).toHaveBeenCalledWith('id', fakeId)
    })

    it('should get user by userName', async() => {
        getByMock.mockResolvedValueOnce(sampleUserAccount)
        const actual = await sut.getUserByUserName(sampleUserAccount.userName)
        expect(actual).toEqual(sampleUserAccount)
        expect(getByMock).toHaveBeenCalledWith('userName', sampleUserAccount.userName)
    })
})