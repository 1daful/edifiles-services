var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { NetworkLocal } from '../api/network.js';
import PouchDB from 'pouchdb';
//import config from 'pouchdb';
//import { Utility } from "../Utility";
//import { FIRepository } from "./FIRepository";
export class Pouchdb {
    constructor(collName) {
        this.db = new PouchDB(collName /*{skip_setup: true}*/);
        //this.createIndex(['id'])
        /*const remoteDB = new PouchDB(config.api.PouchDB.url)
        this.db.sync(remoteDB, {
          live: true, retry: true
        }).on('change', (change: any) => {
           // yo, something changed!
          }).on('paused', function (info: any) {
              // replication was paused, usually because of a lost connection
          }).on('active', function (info: any) {
              // replication was resumed
          }).on('error', function (err: any) {
               // totally unhandled error (shouldn't happen)
              });*/
    }
    search(field, query, collName) {
        return this.db.search(field, query);
    }
    //PouchDB = require('pouchdb')
    /**
     * Save index.
     * @param collName
     */
    /*setItems(collName: string) {
        this.db = new PouchDB(collName)
        this.db.put(this.ddoc).then(function () {
            console.log('success')
        }).catch(function(err: any) {
            console.log(err)
        })
    }*/
    /*Query(collName: string, id: string) {
        this.db = new PouchDB(collName);
        this.db.query(id).then(function (res: any) {
            console.log(res)
        }).catch(function(err: any) {
            console.log(err)
        })
    }*/
    addItem(item) {
        return __awaiter(this, void 0, void 0, function* () {
            let response;
            if (item) {
                item._id = new Date().toJSON();
                try {
                    response = yield this.db.put(item);
                    console.log("checking response from Repository: ", response);
                    return response;
                }
                catch (err) {
                    console.log("From db", item);
                    console.log(err);
                }
            }
            return response;
        });
    }
    addItems(items, collName) {
        return __awaiter(this, void 0, void 0, function* () {
            let newItems = [];
            try {
                for (const item of items) {
                    item._id = new Date().toJSON();
                    //item._id = item.id
                    newItems.push(item);
                }
                yield this.db.bulkDocs(newItems);
                //await this.db.bulkDocs(items)
                NetworkLocal.test("Adding items to repository");
            }
            catch (err) {
                console.log(err);
            }
        });
    }
    readItems(collName, params, op) {
        return __awaiter(this, void 0, void 0, function* () {
            let items;
            //const params = new Utility().getDefault({include_doc: true}, filters)
            if (op) {
                try {
                    op.include_docs = true;
                    //items = await this.find(params, op)
                    items = yield this.db.allDocs(op);
                    //console.log('with params: ', items)
                }
                catch (err) {
                    console.log(err);
                }
            }
            else {
                try {
                    items = yield this.db.allDocs({ include_docs: true });
                    //console.log("without params: ", items)
                }
                catch (err) {
                    console.log(err);
                }
            }
            return items;
        });
    }
    readItem(collName) {
        return __awaiter(this, void 0, void 0, function* () {
            let item;
            try {
                item = yield this.db.get(collName).then();
            }
            catch (err) {
                console.log(err);
            }
            return item;
        });
    }
    updateItem(docId, param) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const doc = yield this.db.get(docId);
                const response = yield this.db.put(doc, param);
                return response;
            }
            catch (err) {
                console.log(err);
            }
        });
    }
    /*setChild(subPath: string, item: Record<string, any>) {}*/
    deleteItem(docId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const doc = yield this.db.get(docId);
                const response = yield this.db.remove(doc);
                return response;
            }
            catch (err) {
                console.log(err);
            }
        });
    }
    createIndex(fields) {
        return __awaiter(this, void 0, void 0, function* () {
            /*try{
                await this.db.createIndex({
                    index: {fields: fields}
                })
            }
            catch (err) {
                console.log(err)
            }*/
        });
    }
    /**
     * Each parameter provided are part of the find query object parameter.
     * @param sort
     * @param limit
     * @param op The op arg is used for knowing which comparison value to use.
     * @param params This array must follow the order of the op arg.
     */
    find(filters, sort, limit) {
        return __awaiter(this, void 0, void 0, function* () {
            //this.createIndex(...params)
            try {
                let selector = {};
                /*let opObj
                Object.keys(op).forEach(key => {
                    switch (op[key]) {//<, > <=, >=, ==
                        case '<':
    
                            break;
    
                        default:
                            break;
                    }
                })*/
                /*Object.keys(op).forEach(key => {
                    let i = 0; //index has a base value of 0.
                    let fkey = "$" + key
                    const sel = {
                        [key]: {
                            [fkey]: op[key]
                        }
                    }
                    i++;
                    Object.assign(selector, sel)
                });*/
                Object.keys(filters).forEach(filter => {
                    let op = filters[filter];
                    let select = {};
                    Object.keys(op).forEach(element => {
                        let el = "$" + element;
                        const sel = {
                            [el]: op[element]
                        };
                        Object.assign(select, sel);
                    });
                    Object.assign(selector, { [filter]: select });
                });
                return this.db.find({
                    //selector: params,
                    selector: selector,
                    sort: [sort],
                    limit: limit
                });
            }
            catch (err) {
                console.log(err);
            }
        });
    }
}
