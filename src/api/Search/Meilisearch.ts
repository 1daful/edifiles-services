import { MeiliSearch } from 'meilisearch';
import config from "../../utility/config.json";
import { Filter, FilterCheck, FilterCustom, FilterRange } from "../../utility/Types";

export class Meilisearch {
    client = new MeiliSearch({ host: config.api.Meilisearch.host, apiKey: config.api.Meilisearch.apiKey });
    test(collName: any) {
        this.client.index(collName).getTask(0);
    }
    async search(collName: string, query: string, filter: Filter, sort: { attributes: string; order: string; }) {
        let filt: any[] = [];
        let sortVal: string[] = [];
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
    index(collName: string, items: Record<string, any>[]) {
        this.client.index(collName).addDocuments(items)
            .then((res) => console.log("meilisearch", res));
    }
    updateSettings(index: string, filterablesAttributes: any, sortableAttributes: any) {
        this.client.index(index).updateSettings({
            filterableAttributes: filterablesAttributes,
            sortableAttributes: sortableAttributes
        });
    }
    sort(index: string) {
        this.client.index(index).updateRankingRules(['word', 'sort', 'typo', 'proximity', 'attribute', 'exactness']);
    }
    filters(filters: FilterCustom[]) {
        let attrs: any[][] = [];
        filters.forEach(filter => {
            let filts: any[] = [];
            filter.values.forEach(value => {
                let filt = '';
                filt = filter.attribute + ' ' + value.op + ' ' + value.value;
                filts.push(filt);
            });
            attrs.push(filts);
        });
        return attrs;
    }
    filter(filter: FilterCustom) {
        let filts: string[] = [];
        filter.values.forEach(value => {
            let filt = '';
            filt = filter.attribute + ' ' + value.op + ' ' + value.value;
            filts.push(filt);
        });
        return filts;
    }
    checkFilter(filterCheck: FilterCheck) {
        let filts: string[] = [];
        filterCheck.values.forEach(value => {
            let filt = '';
            filt = filterCheck.attribute + ' ' + '=' + ' ' + value;
            filts.push(filt);
        });
        return filts;
    }
    checkFilters(filterChecks: FilterCheck[]) {
        let filters: any[][] = [];
        filterChecks.forEach(filter => {
            let filts: any[] = [];
            filter.values.forEach(value => {
                let filt = '';
                filt = filter.attribute + ' ' + '=' + ' ' + value;
                filts.push(filt);
            });
            filters.push(filts);
        });
        return filters;
    }
    rangeFilter(filterRange: FilterRange) {
        let filt = '';
        filt = filterRange.attribute + ' ' + filterRange.lower + ' ' + filterRange.upper;
        return filt;
    }
    rangeFilters(filterRanges: FilterRange[]) {
        let filters: string[] = [];
        filterRanges.forEach(range => {
            let filt = '';
            filt = range.attribute + ' ' + range.lower + ' ' + range.upper;
            filters.push(filt);
        });
        return filters;
    }
}
