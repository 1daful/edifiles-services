import { SupabaseStore } from "./SupabaseStore";

export class EdiStorage {
  storage = new SupabaseStore()
  
  upload(collName: string, path: string, file: any) {
    this.storage.upload(collName, path, file)
  }

  download(collName: string, path: string) {
    this.storage.download(collName, path)
  }
}
