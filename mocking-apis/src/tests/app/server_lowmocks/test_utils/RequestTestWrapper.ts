import { HTTP_METHODS } from "../../../../app/model/ServerModel"

export class RequestTestWrapper {
    public url: string
    public method: HTTP_METHODS
    public body: object
    public headers: object = {}

    public on(event, cb) {
        if (event === 'data') {
            cb(JSON.stringify(this.body))
        } else {
            cb()
        }
    }

    public clearAllFields() {
        this.body = undefined
        this.url = undefined
        this.method = undefined
        this.headers = {}
    }
}