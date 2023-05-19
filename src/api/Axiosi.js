var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import axios from 'axios';
import { NetworkLocal } from "./network";
//import { networkInterfaces } from "os";
export class Axiosi {
    constructor() {
        /*constructor (resource?: Resource) {
            if (resource) {
                this.resource = resource;
            }
        }*/
        this.message = 'Axios request successful!!!';
        this.config = {};
    }
    //resource!: Resource;
    /* config: AxiosRequestConfig = {
         adapter: "",
         auth: "",
         baseURL: "",
         beforeRedirect: "",
         cancelToken: "",
         data: "",
         decompress: "",
         env: "",
         headers: "",
         httpsAgent: "",
         maxBodyLength: "",
         maxRedirects: "",
         maxContentLength "",
         onDownloadProgress: "",
         onUploadProgress: "",
         params: "",
         paramsSerializer: "",
         proxy: "",
         responseEncoding: "",
         responseType: "",
         signal: "",
         socketPath "",
         timeout: "",
         timeoutErrorMessage: "",
         transformRequest: "",
         transformResponse: "",
         transitional: "",
         url: "",
         validateStatus: "",
         withCredentials: "",
         xsrfCookieName: "",
         xsrfHeaderName: ""
     }*/
    get(resource, auth) {
        return __awaiter(this, void 0, void 0, function* () {
            //try {
            /*if (params) {
                this.resource.setRequestParam(params);
            }*/
            //const baseUrl = await this.resource.getBaseURL()
            const baseUrl = resource.URL;
            //console.log('Axios baseUrl:', baseUrl)
            this.config.headers = (yield resource.getBaseParam()).header;
            this.config.params = (yield resource.getBaseParam()).baseParams;
            this.config.auth = auth;
            //NetworkLocal.test("Calling with Axios config: ", this.config.params)
            //NetworkLocal.test("Config headers: ", this.config.headers)
            if (baseUrl) {
                const response = yield axios.get(baseUrl, this.config);
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
        });
    }
    post(resource, auth) {
        return __awaiter(this, void 0, void 0, function* () {
            //this.resource.setRequestParam(params);
            //this.resource.setRequestParam(data);
            try {
                const baseUrl = yield resource.URL;
                this.config.params = (yield resource.getBaseParam()).baseParams;
                this.config.auth = auth;
                if (baseUrl) {
                    const response = yield axios.post(baseUrl, resource.request.data, this.config);
                    NetworkLocal.test(this.message);
                    return resource.getResponse(response.data);
                }
                //return this.resource.response.dataList;
            }
            catch (err) {
                console.error(err);
            }
            const nothing = [];
            return nothing;
        });
    }
    load(addr, query) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const resp = yield axios.get(addr, query);
                //NetworkLocal.test(filthis.message)
                return resp;
            }
            catch (err) {
                console.error(err);
            }
        });
    }
    postTo(addr, data, query) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const resp = yield axios.post(addr, data, query);
                //NetworkLocal.test(filthis.message)
                return resp;
            }
            catch (err) {
                console.error(err);
            }
        });
    }
}
