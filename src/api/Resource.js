var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { Response } from "./Response";
import site from "../../public/config.json";
//import { Utility } from "../Utility";
/**
 *
 * This class reads a media resource api configuration and sets up request format from it.
 * This class prepares the request parameters, and the appropriate response format.
 */
export class Resource {
    constructor(api, type, request, respName) {
        this.URL = site.backURL;
        this.api = api;
        this.type = type;
        this.request = request;
        this.response = new Response(respName);
        this.api.resources.push(this);
    }
    //setResponse!: Function
    //util = new Utility()
    /**
     * A private method to construct make resource filters part of the request
     * @param url
     * @param params
     */
    /*private addFilters(url = '', params = {}){
        for (const key in this.params) {
            if (url) {
                url = url + this.params[key]
            }
            else if (params) {
                this.pushObject(params, this.params);
            }
        }
    }
    private addParts(url = '', param = {}){
        for (const key in this.childrens) {
            if (url) {
                url = url + '/'

            }
        }
    }*/
    /*private setResourceData (param: Record<string, any>, resData: Record<string, any>) {
        let newParam: string;
        const obj: Record<string, any> = {};
        Object.keys(resData).forEach(key => {
            let p;
            if (this.isObject(resData[key])){
                for (const key2 in resData[key]){
                    for (p in param){
                        if (p === resData[key][key2]){
                            newParam = newParam + ` ${key2}: ${param[p]} `;
                        }
                    }
                    obj[key] =  newParam;
                }
            }
            else {
                for (p in param){
                    if (p === resData[key]){
                        obj[key] = resData[p];
                    }
                }
            }
        });
        resData = obj;
    }*/
    isObject(obj) {
        return obj instanceof Object && obj.constructor === Object;
    }
    getRequestParam(resData) {
        let newParam = '';
        //const param = resData; //Request parameters
        Object.keys(resData).forEach(key => {
            if (this.isObject(resData[key])) {
                const keyse = Object.keys(resData[key]);
                let i = 0; //index has a base value of 0.
                Object.keys(resData[key]).forEach((key2) => {
                    if (i < 1 && resData[key][key2]) {
                        if (keyse[i] === 'keyword') {
                            newParam = newParam + resData[key][key2];
                        }
                        else
                            newParam = newParam + `${keyse[i]}:${resData[key][key2]}`;
                    }
                    if (i > 0 && resData[key][key2]) {
                        if (keyse[i] === 'keyword') {
                            newParam = newParam + resData[key][key2];
                        }
                        else
                            newParam = newParam + '&' + `${keyse[i]}:${resData[key][key2]}`;
                    }
                    i++;
                    resData[key] = newParam;
                });
                //console.log("params: ", newParam)
            }
            if (!resData[key]) {
                delete resData[key];
            }
        });
        //NetworkLocal.test("request param: ", resData)
        return resData;
    }
    /*setResponseData() {
        this.setResourceData(this.response.dataSource, this.response.data);
    }*/
    /**
     * this method appends request parameters to api base parameters
     * @param type type of the resource to retrieve
     */
    getBaseParam() {
        return __awaiter(this, void 0, void 0, function* () {
            const obj = {
                header: {},
                baseParams: {
                    baseUrl: ""
                },
            };
            try {
                const apiBaseParams = this.api.getBaseParams().baseParams;
                Object.assign(obj.baseParams, apiBaseParams);
                //NetworkLocal.test("obj.params", this.api.getBaseParams(), this.api.constructor.name)
                Object.assign(obj.baseParams, this.getRequestParam(this.request.params));
                const baseURL = (yield this.getBaseURL()) || "";
                obj.baseParams.baseUrl = baseURL;
                obj.header = (yield this.api.getBaseParams()).header;
                //NetworkLocal.test("config obj: ", obj)
                return obj;
            }
            catch (err) {
                console.log;
            }
            //this.util.joinObject(this.api.BASE_PARAMS, this.getRequestParam(this.request.params));
            return obj;
        });
    }
    getBaseURL() {
        return __awaiter(this, void 0, void 0, function* () {
            //const ApiBaseURL = this.api.BASE_URL + this.request.baseUrl;
            try {
                const apiBaseUrl = yield this.api.getBaseUrl();
                const baseUrl = apiBaseUrl + this.request.baseUrl;
                return baseUrl;
            }
            catch (err) {
                console.log(err);
            }
        });
    }
    /*setDataSource(data: Record<string, any>) {
        this.response.dataSource = data.items;
    }*/
    getResponse(data) {
        //this.setDataSource(data);
        return this.api.getData(data);
    }
    getData(resData) {
        let respData = [];
        let mData;
        for (const data of resData) {
            mData = {
                type: "books",
                id: data.id,
                status: '',
                privacy: '',
                tags: [],
                description: data.volumeInfo.description,
                genre: data.mainCategory,
                thumbnailSmall: data.volumeInfo.imageLinks.smallThumbnail,
                thumbnailLarge: data.volumeInfo.imageLinks.thumbnail,
                created: data.volumeInfo.publishedDate,
                license: '',
                title: data.volumeInfo.title,
                authors: data.authors,
                printType: data.printType //book or magazine
            };
            //this.volumeRes.response.dataList.push(mData);
            respData.push(mData);
        }
        return respData;
    }
}
