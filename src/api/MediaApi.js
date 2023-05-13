var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { NetworkLocal } from './network';
import { Axiosi } from "./Axiosi";
//import { ApiFormat } from "../apiReqFormat/ApiFormat";
/**
 * This class takes all the individual media apis and use them for the application.
 */
export class MediaApi {
    //client: ApiClient;
    constructor(api) {
        //this.client = new Axiosi();
        this.api = api;
    }
    /**
     * sethAuth sets the api key and id from the app config file
     */
    /*setAuth()  {
        let ap: Record<string, any> = data.api;
        Object.keys(ap).forEach(key => {
            if (this.api.constructor.name === key) {
                for (let key2 in ap[key]) {
                    if (key2 === 'id') {
                        this.api.BASE_PARAMS.ID = ap[key][key2];
                    }
                    if (key2 === 'key') {
                        this.api.BASE_PARAMS.KEY = ap[key][key2];
                    }
                }
            }
        });
    }/*

    /**
     * this method appends request parameters to api base parameters
     * @param type type of the resource to retrieve
     */
    /*private setBaseParam(resource: Resource){
        this.pushObject(this.api.BASE_PARAMS, resource.request.params);
    }*/
    /**
     * pushObject takes two objects and put the first object into the second while removing any key that contains no value
     * @param bigObj the first object
     * @param smallObj the second object
     */
    /*private pushObject(bigObj: Record<string, any>, smallObj: Record<string, any>) {
        const obj: Record<string, any> = {};
        Object.keys(bigObj).forEach(key => {
            if(bigObj[key]){
                obj[key] = bigObj[key];
            }
        })
        Object.keys(smallObj).forEach(key => {
            if(smallObj[key]){
                obj[key] = smallObj[key]
            }
        })
        bigObj = obj;
    }*/
    getResource(type) {
        let resource;
        for (const iterator of this.api.resources) {
            if (iterator['type'] === type) {
                resource = iterator;
            }
        }
        NetworkLocal.test("resource type: ", resource.type);
        return resource;
    }
    getItems(type) {
        return __awaiter(this, void 0, void 0, function* () {
            //this.api.apiFormat = new ApiFormat(params)
            const resource = this.getResource(type);
            //this.setBaseParam(resource);
            const client = new Axiosi();
            const items = yield client.get(resource);
            return items;
        });
    }
    postItem(type) {
        return __awaiter(this, void 0, void 0, function* () {
            //this.api.apiFormat = new ApiFormat(params)
            const resource = this.getResource(type);
            //this.setBaseParam(resource);
            const client = new Axiosi();
            const response = yield client.post(resource);
            return response;
        });
    }
}
