import { DataBase } from "../../app/data/DataBase"
import { UserCredentialsDataAccess } from "../../app/data/UserCredentialsDataAccess"

const insertMock = jest.fn()
const getByMock = jest.fn()

jest.mock('../../app/data/DataBase', () => {
    return {
        DataBase: {
            insert: insertMock,
            getBy: getByMock
        }
    }
})
describe('UserCredentialsDataAccess test suite', () => {
    let sut : UserCredentialsDataAccess

    beforeEach(() => {
        sut = new UserCredentialsDataAccess()
        expect(DataBase).toHaveBeenCalledTimes(1)
    })

    afterEach(() => {
        jest.clearAllMocks()
    })
})