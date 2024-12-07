import { generateRandomId } from "../../../app/data/IdGenerator";

describe('dGeneator test suite', () => {
    it('should generate a random id', () => {
        const id = generateRandomId()
        expect(id.length).toBe(20)
    })
})