var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { Pouchdb } from "./Pouchdb";
import { SupabaseRepo } from "./SupabaseRepo";
export class Repository {
    constructor(collName) {
        this.collName = collName;
        //this.db = new Pouchdb(collName)
        this.db = new SupabaseRepo();
    }
    search(field, query, collName) {
        return this.db.search(field, query);
    }
    find(filters, collName, params) {
        return this.db.find(filters, collName);
    }
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
    addItem(collName, param) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.db.addItem(collName, param);
        });
    }
    addItems(collName, param) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.db.addItems(collName, param);
        });
    }
    readItem(coll, field, value) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.db.readItem(coll, field, value);
        });
    }
    readItems(collName, params, param, op, limit) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.db.readItems(collName, params, param, op, limit);
        });
    }
    updateItem(docId, param) {
        this.db.updateItem(docId, param, this.collName);
    }
    deleteItem(docId) {
        this.db.deleteItem(docId, this.collName);
    }
}
