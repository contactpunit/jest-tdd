import type { Config } from '@jest/types'

const baseDir = '<rootDir>/src/app/'

const testDir = '<rootDir>/src/tests/app/'

const config: Config.InitialOptions = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    verbose: true,
    collectCoverage: true,
    collectCoverageFrom: [
        `${baseDir}/**/*.ts`
    ],
    testMatch: [
        `${testDir}/auth/**/*test.ts`,
        `${testDir}/data/**/*test.ts`,
        `${testDir}/handlers/**/*test.ts`,
        `${testDir}/server/**/*test.ts`,
        `!${testDir}/server_lowmocks/**/*test.ts`
    ]
}

export default config