"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Pouchdb = void 0;
const network_js_1 = require("../api/network.js");
const pouchdb_1 = __importDefault(require("pouchdb"));
//import config from 'pouchdb';
//import { Utility } from "../Utility";
//import { FIRepository } from "./FIRepository";
class Pouchdb {
    constructor(collName) {
        this.db = new pouchdb_1.default(collName /*{skip_setup: true}*/);
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
    //repository: IRepository;
    //name: string;
    //message!: string;
    //remoteCouch = false;
    db;
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
    async addItem(item) {
        let response;
        if (item) {
            item._id = new Date().toJSON();
            try {
                response = await this.db.put(item);
                console.log("checking response from Repository: ", response);
                return response;
            }
            catch (err) {
                console.log("From db", item);
                console.log(err);
            }
        }
        return response;
    }
    async addItems(items, collName) {
        let newItems = [];
        try {
            for (const item of items) {
                item._id = new Date().toJSON();
                //item._id = item.id
                newItems.push(item);
            }
            await this.db.bulkDocs(newItems);
            //await this.db.bulkDocs(items)
            network_js_1.NetworkLocal.test("Adding items to repository");
        }
        catch (err) {
            console.log(err);
        }
    }
    async readItems(collName, params, op) {
        let items;
        //const params = new Utility().getDefault({include_doc: true}, filters)
        if (op) {
            try {
                op.include_docs = true;
                //items = await this.find(params, op)
                items = await this.db.allDocs(op);
                //console.log('with params: ', items)
            }
            catch (err) {
                console.log(err);
            }
        }
        else {
            try {
                items = await this.db.allDocs({ include_docs: true });
                //console.log("without params: ", items)
            }
            catch (err) {
                console.log(err);
            }
        }
        return items;
    }
    async readItem(collName) {
        let item;
        try {
            item = await this.db.get(collName).then();
        }
        catch (err) {
            console.log(err);
        }
        return item;
    }
    async updateItem(docId, param) {
        try {
            const doc = await this.db.get(docId);
            const response = await this.db.put(doc, param);
            return response;
        }
        catch (err) {
            console.log(err);
        }
    }
    /*setChild(subPath: string, item: Record<string, any>) {}*/
    async deleteItem(docId) {
        try {
            const doc = await this.db.get(docId);
            const response = await this.db.remove(doc);
            return response;
        }
        catch (err) {
            console.log(err);
        }
    }
    async createIndex(fields) {
        /*try{
            await this.db.createIndex({
                index: {fields: fields}
            })
        }
        catch (err) {
            console.log(err)
        }*/
    }
    /**
     * Each parameter provided are part of the find query object parameter.
     * @param sort
     * @param limit
     * @param op The op arg is used for knowing which comparison value to use.
     * @param params This array must follow the order of the op arg.
     */
    async find(filters, sort, limit) {
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
    }
}
exports.Pouchdb = Pouchdb;
//# sourceMappingURL=Pouchdb.js.map