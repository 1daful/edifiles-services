/**
 * Class utility to check for local developer or network developer IDE.
 */
import { isLoopbackAddr } from "is-loopback-addr";
export class NetworkLocal {
    static test(message, msg, name) {
        if (name) {
            console.log(name);
            console.log(message, msg);
            //console.log("Network offline:")
            //console.log(this.dummyData)
            return this.dummyData;
        }
    }
}
//os = require('os')
NetworkLocal.isLoopback = isLoopbackAddr(window.location.origin);
NetworkLocal.onLine = window.navigator.onLine;
NetworkLocal.dummyData = {
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
/*if(!isArray(response.data)) {
    res = this.resource.getResponse([response.data])
}
else {
    res = this.resource.getResponse(response.data)
}*/ 
