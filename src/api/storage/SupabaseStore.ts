import { createClient } from '@supabase/supabase-js';
import config from '../../utility/config.json';
import { IEdiStorage } from './IEdiStorage';
export class SupabaseStore implements IEdiStorage {
  supabase = createClient(config.api.Supabase.url, config.api.Supabase.key)
  async create(path: string) {
    const { data, error } = await this.supabase.storage.createBucket(path)
    return { data, error }
  }

  async getUrl(collName: string, path: string) {
    return await this.supabase.storage.from(collName).getPublicUrl(path)
  }

  async upload(collName: string, path: string, file: File): Promise<any> {
  	const { data, error } = await this.supabase.storage
    .from(collName)
    .upload(path, file)
    return { data, error }
  }

  async download(collName: string, path: string) {
  	const { data, error } = await this.supabase.storage.from(collName).download(path)
    return { data, error }
  }
    
  async getThumbnail(bucket: string, name: string){
    //const url = 'public/' + name + 'jpg'
    return await this.supabase.storage .from(bucket).getPublicUrl(name).data.publicUrl // path to the image in the bucket 
  }
    
  async getFile(url: string) {
    let response = await fetch(url)
    let file = await response.blob
    return file
  }
}
