"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NetworkLocal = void 0;
/**
 * Class utility to check for local developer or network developer IDE.
 */
const is_loopback_addr_1 = require("is-loopback-addr");
class NetworkLocal {
    //os = require('os')
    static isLoopback = (0, is_loopback_addr_1.isLoopbackAddr)(window.location.origin);
    static onLine = window.navigator.onLine;
    static test(message, msg, name) {
        if (name) {
            console.log(name);
            console.log(message, msg);
            //console.log("Network offline:")
            //console.log(this.dummyData)
            return this.dummyData;
        }
    }
    static dummyData = {
        name: "dummyData",
        data: {
            id: 1,
            status: "released",
            privacy: "public",
            tags: ['test', 'dummy variable'],
            description: 'This is a test json data for the ui',
            genre: "Dummy Variable",
            thumbnailSmall: "data_dummy_small.jpg",
            thumbnailLarge: "data.dummy_large",
            created: "01-02-20",
            license: "GPL",
            title: "Dummy Data comes handy",
            authors: {
                name: "Wonder Ayanfe",
                pic: "awonder1",
                bio: "Quality-oriented"
            },
            printType: "papaerback" //book or magazine
        }
    };
}
exports.NetworkLocal = NetworkLocal;
/*if(!isArray(response.data)) {
    res = this.resource.getResponse([response.data])
}
else {
    res = this.resource.getResponse(response.data)
}*/ 
//# sourceMappingURL=network.js.map