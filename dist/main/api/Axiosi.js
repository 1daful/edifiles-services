"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Axiosi = void 0;
const axios_1 = __importDefault(require("axios"));
const network_1 = require("./network");
//import { networkInterfaces } from "os";
class Axiosi {
    /*constructor (resource?: Resource) {
        if (resource) {
            this.resource = resource;
        }
    }*/
    message = 'Axios request successful!!!';
    config = {};
    async get(resource, auth) {
        //try {
        /*if (params) {
            this.resource.setRequestParam(params);
        }*/
        //const baseUrl = await this.resource.getBaseURL()
        const baseUrl = resource.URL;
        //console.log('Axios baseUrl:', baseUrl)
        this.config.headers = (await resource.getBaseParam()).header;
        this.config.params = (await resource.getBaseParam()).baseParams;
        this.config.auth = auth;
        //NetworkLocal.test("Calling with Axios config: ", this.config.params)
        //NetworkLocal.test("Config headers: ", this.config.headers)
        if (baseUrl) {
            const response = await axios_1.default.get(baseUrl, this.config);
            /*.catch((error) => {
                if (error.request) {

                    const data = NetworkLocal.test(this.message)
                    if (response){
                        return this.resource.getResponse(response.data);
                    }
                    else {
                        data
                    }
                }
            })*/
            //NetworkLocal.test("response: ", response, "resp")
            const res = resource.getResponse(response.data);
            //NetworkLocal.test("axios res: ", res, "res")
            return res;
        }
        //return this.resource.response.dataList;
        //}
        /*catch (error) {
            console.error(error)
        }*/
        const nothing = [];
        return nothing;
    }
    async post(resource, auth) {
        //this.resource.setRequestParam(params);
        //this.resource.setRequestParam(data);
        try {
            const baseUrl = await resource.URL;
            this.config.params = (await resource.getBaseParam()).baseParams;
            this.config.auth = auth;
            if (baseUrl) {
                const response = await axios_1.default.post(baseUrl, resource.request.data, this.config);
                network_1.NetworkLocal.test(this.message);
                return resource.getResponse(response.data);
            }
            //return this.resource.response.dataList;
        }
        catch (err) {
            console.error(err);
        }
        const nothing = [];
        return nothing;
    }
    async load(addr, query) {
        try {
            const resp = await axios_1.default.get(addr, query);
            //NetworkLocal.test(filthis.message)
            return resp;
        }
        catch (err) {
            console.error(err);
        }
    }
    async postTo(addr, data, query) {
        try {
            const resp = await axios_1.default.post(addr, data, query);
            //NetworkLocal.test(filthis.message)
            return resp;
        }
        catch (err) {
            console.error(err);
        }
    }
}
exports.Axiosi = Axiosi;
//# sourceMappingURL=Axiosi.js.map