//import { MediaType } from "./Types";

//import { Resource } from "./api/Resource";
export interface ApiClient{
    //load(file: string): any;
    get(params: Record<string,any>): any;
    post(/*data: Record<string,any>, */params: Record<string, any>, auth?: any): any;
}
