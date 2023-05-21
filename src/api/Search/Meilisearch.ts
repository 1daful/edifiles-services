import { MeiliSearch } from 'meilisearch';
import config from "../../utility/config.json";
import { Filter, FilterCheck, FilterRange } from "../../utility/Types";

export class Meilisearch {
    client = new MeiliSearch({ host: config.api.Meilisearch.host, apiKey: config.api.Meilisearch.apiKey });
    test(collName: any) {
        this.client.index(collName).getTask(0);
    }
    async search(collName: string, query: string, filter: Filter, sort) {
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
    filters(filters: Filter[]) {
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
