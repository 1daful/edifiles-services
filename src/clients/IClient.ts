import { ApiRequest } from "../api/Request";
export interface IClient{

    get(request: ApiRequest, options?: any): any

    post(request: ApiRequest, options?: any): any

    postWithTransaction?(request: ApiRequest, options?: any): any

}
