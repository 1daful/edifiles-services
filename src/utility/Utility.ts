import { DocumentNode } from "graphql";
import { QueryType } from "./Types";

export const handler = {
        get: function(obj: Record<string, any>, prop: string) {
            return prop in obj ? obj[prop]: 'defValue'
        }
    };

    export function getDefaultProxy(target: Record<string, any>) {
        return new Proxy(target, handler);
    }

    export function getDefault(obj1: Record<string, any>, obj2: Record<string, any>) {
        const targetObj = obj2
        for (const key in obj1) {
            if (!targetObj[key]) {
                targetObj[key] = obj1[key]
            }
        }
        return targetObj
    }

     /**
     * pushObject takes two objects and put the first object into the second while removing any key that contains no value
     * @param bigObj the first object
     * @param smallObj the second object
     */
     export function joinObject(bigObj: Record<string, any>, smallObj: Record<string, any>) {
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
        return obj;
    }

    export function isObject(obj: Record<string, any>){
        return obj instanceof Object && obj.constructor === Object;
    }
    
    export function getUrl(url: string) {
          const ret = url.split("&").reduce(function(res, param) {
              let [key, val] = param.split("=");
              res[key] = val;
              return res
            }, {})
            return ret as Record<string, any>
            //let params = token.searchParams
        
      }

      export function isType<T>(obj: any): obj is T {
        const propertiesToCheck: (keyof T)[] = Object.keys(obj) as (keyof T)[];
        return propertiesToCheck.every(prop => typeof obj[prop] !== 'undefined');
      }
      export function isDocumentNode(query: any): query is DocumentNode {
        return query?.definitions !== undefined
      }