import { Request } from "./Request";
import { Response } from "./Response";
import { Axiosi } from "../api/Axiosi";
import site from "../utility/config.json";
import { IMediaApi } from "./IMediaApi";
//import { MethodType } from "../utility/Types";
//import { Utility } from "../Utility";
/**
 *
 * This class reads a media resource api configuration and sets up request format from it.
 * This class prepares the request parameters, and the appropriate response format.
 */
export class Resource {
    constructor(api: IMediaApi, request: Request) {
        this.api = api
        this.request = request;
        //this.response = new Response(thisrespName);
        //this.api.resources.push(this);
    }

    /*init<T extends Record<string, any>, U, W>(url: string, query: T, params: U, method: MethodType, data?: W) {
        params
        method
        data
        const queryUrl = this.getBaseParams(this.getRequestParam(query))
        return {
            url,
            queryUrl,
            params,
            method,
            data
        }
    }*/
    async init() {
        return await this.client.get(this)
        //this.response = new Response(thisrespName);
    }

    request: Request;
    response!: Response
    client = new Axiosi()
    api
    //data!: Record<string, any>;
    URL = site.backURL
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

    private isObject(obj: Record<string, any>){
        return obj instanceof Object && obj.constructor === Object;
    }

    getRequestParam(resData: Record<string, any>) {
        let newParam = '';
        //const param = resData; //Request parameters

        Object.keys(resData).forEach(key => {
            if (this.isObject(resData[key])){
                const keyse = Object.keys(resData[key])
                let i = 0; //index has a base value of 0.
                Object.keys(resData[key]).forEach((key2) => {
                    if (i < 1 && resData[key][key2]) {
                        if (keyse[i] === 'keyword') {
                            newParam = newParam + resData[key][key2]
                        }
                        else
                        newParam = newParam + `${keyse[i]}:${resData[key][key2]}`
                    }

                    if (i > 0 && resData[key][key2]) {
                        if (keyse[i] === 'keyword') {
                            newParam = newParam + resData[key][key2]
                        }
                        else
                        newParam = newParam + '&' + `${keyse[i]}:${resData[key][key2]}`
                    }
                    i++;
                    resData[key] =  newParam;
                })
                //console.log("params: ", newParam)
            }
            if (!resData[key])
            {
                delete resData[key]
            }
        });
        //NetworkLocal.test("request param: ", resData)
        return resData
    }

    /*setResponseData() {
        this.setResourceData(this.response.dataSource, this.response.data);
    }*/

    /**
     * this method appends request parameters to api base parameters
     * @param type type of the resource to retrieve
     */
    getBaseParam(){
      const obj = {
        header: {},
        baseParams: {
          baseUrl: ""
        },
      }
        try {
            const apiBaseParams = this.api.getBaseParams().baseParams
            Object.assign(obj.baseParams, apiBaseParams);
            //NetworkLocal.test("obj.params", this.api.getBaseParams(), this.api.constructor.name)
            Object.assign(obj.baseParams, this.getRequestParam(this.request.params))
            const baseURL = this.getBaseURL() || ""
            obj.baseParams.baseUrl = baseURL
            obj.header = this.api.getBaseParams().header
            //NetworkLocal.test("config obj: ", obj)
            return obj
        }
        catch (err) {
            console.log
        }
        //this.util.joinObject(this.api.BASE_PARAMS, this.getRequestParam(this.request.params));

        return obj
    }

    getBaseURL() {
        //const ApiBaseURL = this.api.BASE_URL + this.request.baseUrl;
        try {
            const apiBaseUrl = this.api.getBaseUrl();
            const baseUrl = apiBaseUrl + this.request.baseUrl;
            return baseUrl
        }
        catch (err) {
            console.log(err)
        }
    }

    /*setDataSource(data: Record<string, any>) {
        this.response.dataSource = data.items;
    }*/

    getResponse(respName: string, data: any) {
        //this.setDataSource(data);
        this.response = new Response(respName)
        this.response.data = data
        //return this.api.getData(data);
    }

    /*addResource(api: IMediaApi){
        api.resources.push(this);
    }*/
}
