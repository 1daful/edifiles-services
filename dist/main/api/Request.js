"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Request = void 0;
class Request {
    constructor(name, url, params) {
        this.name = name;
        this.baseUrl = url;
        this.params = params;
    }
    name;
    baseUrl;
    params;
    data;
}
exports.Request = Request;
//# sourceMappingURL=Request.js.map