export class MockSpiesUseCase {
    public toUpper(arg: string) {
        return arg.toUpperCase()
    }

    public toLog(arg: string) {
        console.log(arg)
    }

    private externalApiCall() {
        console.log('external api called')
    }
}