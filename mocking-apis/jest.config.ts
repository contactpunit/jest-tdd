import type { Config } from '@jest/types'

const baseDir = '<rootDir>/src/app/data'

const testDir = '<rootDir>/src/tests/data'

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