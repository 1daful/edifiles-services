import { Pouchdb } from "./Pouchdb";
import { SupabaseRepo } from "./SupabaseRepo";
export class Repository {
    collName;
    constructor(collName) {
        this.collName = collName || '';
        //this.db = new Pouchdb(collName)
        this.db = new SupabaseRepo();
    }
    search(field, query, collName) {
        return this.db.search(field, query);
    }
    find(filters, collName, params) {
        return this.db.find(filters, collName);
    }
    db;
    changeDB(db, collName) {
        switch (db) {
            case 'pouchdb':
                return new Pouchdb(collName);
                break;
            case 'supabase':
                return new SupabaseRepo();
            default:
                break;
        }
        return new SupabaseRepo();
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
