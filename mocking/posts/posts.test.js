import { describe, it, expect, beforeEach} from 'vitest'
import { extractPostData } from './posts'

const testTitle = 'test title'
const testContent = 'test content'
let testForm

describe('extractPostData()', () => {

    beforeEach(() => {
        testForm = {
            title: testTitle,
            content: testContent,
            get(identifier) {
                return this[identifier]
            }
        };
    })

    it('should check title and content data from form element', () => {
        const {title, content} = extractPostData(testForm)
        expect(title).toBe(title)
        expect(content).toBe(content)

    })
})