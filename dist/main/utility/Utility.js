"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = void 0;
exports.getDefaultProxy = getDefaultProxy;
exports.getDefault = getDefault;
exports.joinObject = joinObject;
exports.isObject = isObject;
exports.getUrl = getUrl;
exports.isType = isType;
exports.isDocumentNode = isDocumentNode;
exports.handler = {
    get: function (obj, prop) {
        return prop in obj ? obj[prop] : 'defValue';
    }
};
function getDefaultProxy(target) {
    return new Proxy(target, exports.handler);
}
function getDefault(obj1, obj2) {
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
function joinObject(bigObj, smallObj) {
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
function isObject(obj) {
    return obj instanceof Object && obj.constructor === Object;
}
function getUrl(url) {
    const ret = url.split("&").reduce(function (res, param) {
        let [key, val] = param.split("=");
        res[key] = val;
        return res;
    }, {});
    return ret;
    //let params = token.searchParams
}
function isType(obj) {
    const propertiesToCheck = Object.keys(obj);
    return propertiesToCheck.every(prop => typeof obj[prop] !== 'undefined');
}
function isDocumentNode(query) {
    return query?.definitions !== undefined;
}
//# sourceMappingURL=Utility.js.map