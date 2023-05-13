export class Utility {

    handler = {
        get: function(obj: Record<string, any>, prop: string) {
            return prop in obj ? obj[prop]: 'defValue'
        }
    };

    getDefaultProxy(target: Record<string, any>) {
        return new Proxy(target, this.handler);
    }

    getDefault(obj1: Record<string, any>, obj2: Record<string, any>) {
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
    joinObject(bigObj: Record<string, any>, smallObj: Record<string, any>) {
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

    getUrl(url: string) {
          const ret = url.split("&").reduce(function(res, param) {
              let [key, val] = param.split("=");
              res[key] = val;
              return res
            }, {})
            return ret as Record<string, any>
            //let params = token.searchParams
        
      }

}