import { HTTP_CODES } from "../../../../app/model/ServerModel";

export class ResponseTestWrapper {
    public statusCode: HTTP_CODES
    public headers = new Array<object>()
    public body: object
    
    public write(stringifiedBody: string) {
        this.body = JSON.parse(stringifiedBody)
    }

    public writeHead(statusCode: HTTP_CODES, header: object) {
        this.statusCode = statusCode
        this.headers.push(header)
    }

    public end() {}

    public clearAllFields() {
        this.body = undefined
        this.statusCode = undefined
        this.headers.length = 0
    }
}