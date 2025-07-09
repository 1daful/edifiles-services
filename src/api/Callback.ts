import { RestClient } from "../clients/RestClient";
//import { config } from "../config";
import { ApiConfig, ApiRequest } from "../utility/Types";

export class Callback {
    /**
     * Creates an instance of the class with the specified backend API and request configuration.
     *
     * @param backEndApi - The API configuration used to initialize the backend REST client.
     * @param reqConfig - The API configuration for the request.
     */
    client: RestClient;
   // reqConfig: ApiConfig;
    backEndApi: ApiConfig;

    constructor(backEndApi: ApiConfig) {
        this.backEndApi = backEndApi;
        //this.reqConfig = reqConfig;
        this.client = new RestClient(backEndApi);
    }

    /**
     * Sends a GET request to the specified backend URL using the provided `ApiRequest` configuration.
     *
     * This method constructs a new request URL by combining the base URL from the instance's configuration
     * with the URL from the provided `ApiRequest`. It merges the request configuration with the instance's
     * configuration, then creates a new `ApiRequest` object and sends it using the client's `get` method.
     *
     * @param backEndURL - The backend endpoint to which the GET request will be sent.
     * @param request - The API request object containing the relative URL and configuration options.
     */
    post(backEndURL: string, requests: ApiRequest[] ) {
        let config: ApiRequest[] = []
        /*requests.forEach(req => {
            //const reqUrl = this.reqConfig.endPoint + req.url
            //const reqConfig = this.reqConfig
            //Object.assign(reqConfig, req.params)

            const newReq: ApiRequest = {
                url: reqUrl,
                params: reqConfig,
                methodType: req.methodType,
            }
            config.push(newReq)
        })*/
        const req: ApiRequest = {
            url: backEndURL,
            params: requests,
            methodType: 'post',
        }
        return this.client.post(req)
    }
}