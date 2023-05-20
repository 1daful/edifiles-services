import { ApiClient } from "../utility/apiClient";
import { Resource } from "./Resource";
import axios, { AxiosBasicCredentials, AxiosRequestConfig } from 'axios';
//import { NetworkLocal } from "./network";
//import { networkInterfaces } from "os";

export class Axiosi implements ApiClient {
    /*constructor (resource?: Resource) {
        if (resource) {
            this.resource = resource;
        }
    }*/

    message =  'Axios request successful!!!';
    config: AxiosRequestConfig = {}

    async get (resource: Resource, auth?: AxiosBasicCredentials) {
            //try {
                /*if (params) {
                    this.resource.setRequestParam(params);
                }*/
                //const baseUrl = await this.resource.getBaseURL()
                const baseUrl = resource.URL
                //console.log('Axios baseUrl:', baseUrl)
                this.config.headers = (await resource.getBaseParam()).header;
                this.config.params = (await resource.getBaseParam()).baseParams
                this.config.auth = auth
                //NetworkLocal.test("Calling with Axios config: ", this.config.params)
                //NetworkLocal.test("Config headers: ", this.config.headers)
                if (baseUrl) {
                    const response: any = await axios.get(baseUrl, this.config)
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
                    const res = resource.getResponse(response.data)
                    //NetworkLocal.test("axios res: ", res, "res")
                    return res
                }
                //return this.resource.response.dataList;
            //}
            /*catch (error) {
                console.error(error)
            }*/
        const nothing: Record<string, any>[] = []
        return nothing;
    }

    async post(resource: Resource, auth?: AxiosBasicCredentials) {
            //this.resource.setRequestParam(params);
            //this.resource.setRequestParam(data);

            try {
                const baseUrl = await resource.URL
                this.config.params = (await resource.getBaseParam()).baseParams;
                this.config.auth = auth
                if (baseUrl) {
                    const response = await axios.post(baseUrl, resource.request.data, this.config)
                    //NetworkLocal.test(this.message);
                    return resource.getResponse(response.data);
                }
                    //return this.resource.response.dataList;
            }
            catch (err) {
                console.error(err);
            }
        
        const nothing: Record<string, any>[] = []
        return nothing;
    }

    async load(addr: string, query?: any) {
        try {
            const resp = await axios.get(addr, query)
            //NetworkLocal.test(filthis.message)
            return resp
        }
        catch (err) {console.error(err)}
    }

    async postTo(addr: string, data?: any, query?: any) {
        try {
            const resp = await axios.post(addr, data, query)
            //NetworkLocal.test(filthis.message)
            return resp
        }
        catch (err) {console.error(err)}
    }
      
}
