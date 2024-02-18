export interface IClient{

    get(request: any): any

    post(request: any): any

    postWithTransaction?(request: any): any

}