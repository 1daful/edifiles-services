import { IEdiStorage } from "./IEdiStorage";
import { SupabaseStore } from "./SupabaseStore";

export class EdiStorage implements IEdiStorage {
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
  
  async upload(collName: string, path: string, file: any): Promise<any> {
    return await this.storage.upload(collName, path, file)
  }

  async download(collName: string, path: string): Promise<any> {
    return await this.storage.download(collName, path)
  }
}
