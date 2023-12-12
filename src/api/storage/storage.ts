import { IClient } from "../../clients/IClient";
import { SupabaseStore } from "./SupabaseStore";

export class EdiStorage implements IClient {
  storage = new SupabaseStore()
  async create(path: string): Promise<any> {
    return await this.storage.create(path);
  }
  async getUrl(bucket: string, name: string): Promise<any> {
    return await this.storage.getUrl(bucket, name);
  }
  async getFile(url: string): Promise<any> {
    return await this.storage.getFile(url);
  }
  
  async post(collName: string, path: string, file: any): Promise<any> {
    return await this.storage.upload(collName, path, file)
  }

  async get(collName: string, path: string): Promise<any> {
    return await this.storage.download(collName, path)
  }
}
