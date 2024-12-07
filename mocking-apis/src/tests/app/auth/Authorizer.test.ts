import { Authorizer } from "../../../app/auth/Authorizer";
import { SessionTokenDataAccess } from "../../../app/data/SessionTokenDataAccess";
import { UserCredentialsDataAccess } from "../../../app/data/UserCredentialsDataAccess";

const invalidateTokenMock = jest.fn()
const isValidTokenMock = jest.fn()
const generateTokenMock = jest.fn()

jest.mock('../../../app/data/SessionTokenDataAccess', () => {
    return {
        SessionTokenDataAccess: jest.fn().mockImplementation(() => {
            return {
                invalidateToken: invalidateTokenMock,
                isValidToken: isValidTokenMock,
                generateToken: generateTokenMock

            }
        })
    }
})


const addUserMock = jest.fn()
const getUserByUserNameMock = jest.fn()

jest.mock('../../../app/data/UserCredentialsDataAccess', () => {
    return {
        UserCredentialsDataAccess: jest.fn().mockImplementation(() => {
            return {
                getUserByUserName: getUserByUserNameMock,
                addUser: addUserMock
            }
        })
    }
})

describe('Authorizer test suite', () => {

    let sut: Authorizer
    const userName = 'punit'
    const password = '1234'
    const someTokenId = '11111'
    const someuserId = 1

    beforeEach(() => {
        sut = new Authorizer()

        expect(SessionTokenDataAccess).toHaveBeenCalledTimes(1)
        expect(UserCredentialsDataAccess).toHaveBeenCalledTimes(1)
    })

    afterEach(() => {
        jest.clearAllMocks()
    })

    it('should validate the token as false', async () => {
        isValidTokenMock.mockResolvedValue(false)
        const result = await sut.validateToken(someTokenId)

        expect(result).toBe(false)
    })

    it('should validate the token as true', () => {
        isValidTokenMock.mockResolvedValue(true)
        const result = sut.validateToken(someTokenId)

        expect(result).toBeTruthy()
    })

    it('should register a user', async () => {
        addUserMock.mockResolvedValue(someuserId)
        const result = await sut.registerUser(userName, password)

        expect(result).toBe(someuserId)
    })

    it('should allow login', async () => {
        getUserByUserNameMock.mockResolvedValue({username: 'someuser', password: '1234'})
        generateTokenMock.mockResolvedValue(someTokenId)

        const tokenid = await sut.login(userName, password)
        expect(tokenid).toBe(someTokenId)
    })

    it('should do nothing if different password', async() => {
        getUserByUserNameMock.mockResolvedValue({username: 'abcd', password: 'hello'})

        const result = await sut.login(userName, password)
        expect(result).toBeUndefined()
    })

    it('should logout the user', async () => {
        await sut.logout(someTokenId)

        expect(invalidateTokenMock).toHaveBeenCalledWith(someTokenId)
    })

})