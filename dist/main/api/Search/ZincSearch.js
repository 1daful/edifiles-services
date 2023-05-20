"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.zincSearch = void 0;
const config_json_1 = __importDefault(require("../../../public/config.json"));
const Resource_1 = require("../Resource");
const Axiosi_1 = require("../Axiosi");
class zincSearch {
    client = new Axiosi_1.Axiosi();
    resources = [];
    url = config_json_1.default.api.ZincSearch.baseUrl;
    index = (type, items) => {
        return new Resource_1.Resource(this, "index", {
            name: "indexRes",
            baseUrl: this.url + "/_bulkv2",
            params: config_json_1.default.api.ZincSearch.config,
            data: {
                index: type,
                records: items
            }
        }, "indexResp");
    };
    search = (type, searchType, term, maxResult) => {
        return new Resource_1.Resource(this, "searchRes", {
            name: "indexRes",
            baseUrl: this.url + "/" + type + "/_search",
            params: config_json_1.default.api.ZincSearch.config,
            data: {
                search_type: searchType,
                query: {
                    term: term,
                    start_time: "2021-06-02T14:28:31.894Z",
                    end_time: "2021-12-02T15:28:31.894Z"
                },
                from: 0,
                max_results: maxResult,
                _source: [] // Leave this as empty array to return all fields.
            }
        }, "searchResp");
    };
    getBaseUrl() {
        try {
            //const config = await this.client.load('../config.json')
            const apiBaseUrl = config_json_1.default?.api.ZincSearch.baseUrl;
            return apiBaseUrl;
        }
        catch (err) {
            console.log(err);
        }
    }
    getBaseParams() {
        try {
            //const config = await this.client.load('../config.json')
            const apiBaseParams = config_json_1.default?.api.ZincSearch.config;
            return apiBaseParams;
        }
        catch (err) {
            console.log(err);
        }
    }
    getData(resData) {
        let respData = [];
        let mData;
        return resData.hits.hits;
    }
    SearchResult;
}
exports.zincSearch = zincSearch;
//# sourceMappingURL=ZincSearch.js.map