import { IClient } from "../../clients/IClient";
import { ApiConfig, ApiRequest } from "../../utility/Types";
import { SupabaseStore } from "./SupabaseStore";

export class EdiStorage implements IClient {
  constructor(config: ApiConfig){
    this.storage = new SupabaseStore(config)
  }
  storage
  
  async post(request: RequestType, options?: any): Promise<any> {
    // Ensure request.data is an array of Files
    if (!Array.isArray(request.data) || !request.data.every(file => file instanceof File)) {
      throw new Error("request.data must be an array of Files");
    }
    return await this.storage.uploadFile(request.data, request.url);
  }

  async get(request: RequestType): Promise<any> {
    return await this.storage.downloadFile(request.params.path, request.url);
  }
}


type RequestType = ApiRequest & {
  params: {
    path: string;
  }
}