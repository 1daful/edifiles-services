var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { createClient } from '@supabase/supabase-js';
import config from '../../public/config.json';
export class SupabaseStore {
    constructor() {
        this.supabase = createClient(config.api.Supabase.url, config.api.Supabase.key);
    }
    create(path) {
        return __awaiter(this, void 0, void 0, function* () {
            const { data, error } = yield this.supabase.storage.createBucket(path);
            return { data, error };
        });
    }
    getUrl(collName, path) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.supabase.storage.from(collName).getPublicUrl(path);
        });
    }
    upload(collName, path, file) {
        return __awaiter(this, void 0, void 0, function* () {
            const { data, error } = yield this.supabase.storage
                .from(collName)
                .upload(path, file);
            return { data, error };
        });
    }
    download(collName, path) {
        return __awaiter(this, void 0, void 0, function* () {
            const { data, error } = yield this.supabase.storage.from(collName).download(path);
            return { data, error };
        });
    }
    getThumbnail(bucket, name) {
        return __awaiter(this, void 0, void 0, function* () {
            //const url = 'public/' + name + 'jpg'
            return yield this.supabase.storage.from(bucket).getPublicUrl(name).publicURL; // path to the image in the bucket 
        });
    }
    getFile(url) {
        return __awaiter(this, void 0, void 0, function* () {
            let response = yield fetch(url);
            let file = yield response.blob;
            return file;
        });
    }
}
