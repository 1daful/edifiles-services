import { Resource } from "./Resource";

export class Response {
    name: string;
    data!: Record<string, any>;
    dataSource!: Record<string, any>[];
    dataList!: Record<string, any>[]
    constructor(name: string){
        this.name = name;
    }
}