import { DocumentNode } from "graphql";
import { ApiRequest } from "../api/Request";

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
      
export function getAndCache(query: ApiRequest, get: Function) {
  const queryString = JSON.stringify(query);
   const cacheKey = `yt_${queryString.replace(/[^a-zA-Z0-9]/g, '_')}`;
  const cached = localStorage.getItem(cacheKey);
  const CACHE_DURATION = 6 * 60 * 60 * 1000; // 6 hours
  const now = Date.now();

  if (cached) {
    try {
      const { data, timestamp } = JSON.parse(cached);
      if (now - timestamp < CACHE_DURATION) {
        return data;
      }
    } catch (e) {
      console.warn('Cache parse error', e);
    }
  }

  const data =  get()
  
  localStorage.setItem(cacheKey, JSON.stringify({ data: data, timestamp: now }));
  return data
}