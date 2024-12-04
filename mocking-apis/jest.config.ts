import type { Config } from '@jest/types'

const baseDir = '<rootDir>/src/app/handlers'

const testDir = '<rootDir>/src/tests/app/handlers'

const config: Config.InitialOptions = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    verbose: true,
    collectCoverage: true,
    collectCoverageFrom: [
        `${baseDir}/**/*.ts`
    ],
    testMatch: [
        `${testDir}/**/*.ts`
    ]
}

export default config