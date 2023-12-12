"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Repository = void 0;
//import { Pouchdb } from "./Pouchdb";
const SupabaseRepo_1 = require("./SupabaseRepo");
class Repository {
    collName;
    constructor(config, collName) {
        this.collName = collName || '';
        //this.db = new Pouchdb(collName)
        this.db = new SupabaseRepo_1.SupabaseRepo(config);
    }
    async readQuery(tableName, ids) {
        return await this.db.readQuery(tableName, ids);
    }
    search(field, query, collName) {
        return this.db.search(field, query);
    }
    find(filters, collName, params) {
        return this.db.find(filters, collName);
    }
    db;
    changeDB(db, collName, config) {
        switch (db) {
            case 'pouchdb':
                //return new Pouchdb(collName)
                break;
            case 'supabase':
                return new SupabaseRepo_1.SupabaseRepo(config);
            default:
                break;
        }
        return new SupabaseRepo_1.SupabaseRepo(config);
    }
    async addItem(collName, param) {
        return await this.db.addItem(collName, param);
    }
    async addItems(collName, param) {
        return await this.db.addItems(collName, param);
    }
    async readItem(coll, field, value) {
        return await this.db.readItem(coll, field, value);
    }
    async readItems(table, foreignTable, filters, range, limit) {
        return await this.db.readItems(table, foreignTable, filters, range, limit);
    }
    updateItem(docId, param) {
        this.db.updateItem(docId, param, this.collName);
    }
    deleteItem(docId) {
        this.db.deleteItem(docId, this.collName);
    }
}
exports.Repository = Repository;
//# sourceMappingURL=Repository.js.map