export interface IClient{

    get(query: any, variables?: any): any

    post(query: any, data: any, variables?: any): any

}