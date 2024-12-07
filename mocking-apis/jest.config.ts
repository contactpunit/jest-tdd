import type { Config } from '@jest/types'

const baseDir = '<rootDir>/src/app/auth'

const testDir = '<rootDir>/src/tests/app/auth'

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