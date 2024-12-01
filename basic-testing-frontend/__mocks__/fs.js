import { vi } from "vitest"

export const promises = {
    writeFile: vi.fn((filename, fileData) => {
        return new Promise((resolve, reject) => {
            resolve()
        })
    })
}