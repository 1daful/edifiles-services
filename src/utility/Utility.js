export class Utility {
    constructor() {
        this.handler = {
            get: function (obj, prop) {
                return prop in obj ? obj[prop] : 'defValue';
            }
        };
    }
    getDefaultProxy(target) {
        return new Proxy(target, this.handler);
    }
    getDefault(obj1, obj2) {
        const targetObj = obj2;
        for (const key in obj1) {
            if (!targetObj[key]) {
                targetObj[key] = obj1[key];
            }
        }
        return targetObj;
    }
    /**
    * pushObject takes two objects and put the first object into the second while removing any key that contains no value
    * @param bigObj the first object
    * @param smallObj the second object
    */
    joinObject(bigObj, smallObj) {
        const obj = {};
        Object.keys(bigObj).forEach(key => {
            if (bigObj[key]) {
                obj[key] = bigObj[key];
            }
        });
        Object.keys(smallObj).forEach(key => {
            if (smallObj[key]) {
                obj[key] = smallObj[key];
            }
        });
        return obj;
    }
    getUrl(url) {
        const ret = url.split("&").reduce(function (res, param) {
            let [key, val] = param.split("=");
            res[key] = val;
            return res;
        }, {});
        return ret;
        //let params = token.searchParams
    }
}
