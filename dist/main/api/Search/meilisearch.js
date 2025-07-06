"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Meilisearch = void 0;
const meilisearch_1 = require("meilisearch");
const config_json_1 = __importDefault(require("../../utility/config.json"));
class Meilisearch {
    client = new meilisearch_1.MeiliSearch({ host: config_json_1.default.api.Meilisearch.host, apiKey: config_json_1.default.api.Meilisearch.apiKey });
    test(collName) {
        this.client.index(collName).getTask(0);
    }
    async search(collName, query, filter, sort) {
        let filt = [];
        let sortVal = [];
        if (sort)
            sortVal = [sort.attributes + ':' + sort.order];
        if (filter) {
            if (filter.check) {
                filt.concat(this.checkFilters(filter.check));
            }
            else if (filter.range) {
                filt.concat(this.rangeFilters(filter.range));
            }
            else if (filter.custom) {
                filt.concat(this.filters(filter.custom));
            }
            ;
        }
        return await this.client.index(collName).search(query, {
            filter: filt,
            sort: sortVal
        });
    }
    index(collName, items) {
        this.client.index(collName).addDocuments(items)
            .then((res) => console.log("meilisearch", res));
    }
    updateSettings(index, filterablesAttributes, sortableAttributes) {
        this.client.index(index).updateSettings({
            filterableAttributes: filterablesAttributes,
            sortableAttributes: sortableAttributes
        });
    }
    sort(index) {
        this.client.index(index).updateRankingRules(['word', 'sort', 'typo', 'proximity', 'attribute', 'exactness']);
    }
    filters(filters) {
        let attrs = [];
        filters.forEach(filter => {
            let filts = [];
            filter.values.forEach(value => {
                let filt = '';
                filt = filter.attribute + ' ' + value.op + ' ' + value.value;
                filts.push(filt);
            });
            attrs.push(filts);
        });
        return attrs;
    }
    filter(filter) {
        let filts = [];
        filter.values.forEach(value => {
            let filt = '';
            filt = filter.attribute + ' ' + value.op + ' ' + value.value;
            filts.push(filt);
        });
        return filts;
    }
    checkFilter(filterCheck) {
        let filts = [];
        filterCheck.values.forEach(value => {
            let filt = '';
            filt = filterCheck.attribute + ' ' + '=' + ' ' + value;
            filts.push(filt);
        });
        return filts;
    }
    checkFilters(filterChecks) {
        let filters = [];
        filterChecks.forEach(filter => {
            let filts = [];
            filter.values.forEach(value => {
                let filt = '';
                filt = filter.attribute + ' ' + '=' + ' ' + value;
                filts.push(filt);
            });
            filters.push(filts);
        });
        return filters;
    }
    rangeFilter(filterRange) {
        let filt = '';
        filt = filterRange.attribute + ' ' + filterRange.lower + ' ' + filterRange.upper;
        return filt;
    }
    rangeFilters(filterRanges) {
        let filters = [];
        filterRanges.forEach(range => {
            let filt = '';
            filt = range.attribute + ' ' + range.lower + ' ' + range.upper;
            filters.push(filt);
        });
        return filters;
    }
}
exports.Meilisearch = Meilisearch;
//# sourceMappingURL=Meilisearch.js.map