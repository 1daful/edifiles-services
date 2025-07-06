import { createClient } from '@supabase/supabase-js';
//import config from '../../utility/config.json';
import { IEdiStorage } from './IEdiStorage';
import { ApiConfig, FileOptions, TransformOptions } from '../../utility/Types';

export class SupabaseStore implements IEdiStorage {
  constructor(config: ApiConfig) {
    this.supabase = createClient(config.baseUrl, config.baseConfig.key)
  }

  supabase

  async create(path: string) {
    const { data, error } = await this.supabase.storage.createBucket(path)
    return { data, error }

  }


  async createBucket(bucketName: string) {
  // Step 1: List all buckets
  const { data: buckets, error: listError } = await this.supabase.storage.listBuckets();
  if (listError) {
    console.error("Failed to list buckets:", listError);
    return;
  }

  // Step 2: Check if the bucket already exists
  const exists = buckets?.some(bucket => bucket.name === bucketName);

  if (exists) {
    console.log(`Bucket "${bucketName}" already exists.`);
    return;
  }

  // Step 3: Create the bucket if it does not exist
  const { data: createdBucket, error: createError } = await this.supabase.storage.createBucket(bucketName);
  if (createError) {
    console.error("Error creating bucket:", createError);
    return;
  }

  console.log(`Bucket "${bucketName}" created successfully:`, createdBucket);
}

  async upload(bucket: string, path: string, file: File, options: FileOptions): Promise<any> {
  	const { data, error } = await this.supabase.storage
    .from(bucket)
    .upload(path, file, options)
    return { data, error }
  }

  async download(bucket: string, path: string, options?: {transform: TransformOptions}): Promise<any> {
  	const { data, error } = await this.supabase.storage.from(bucket).download(path, options)
    return { data, error }
  }
    
  async getUrl(bucket: string, name: string): Promise<any>{
    //const url = 'public/' + name + 'jpg'
    return await this.supabase.storage.from(bucket).getPublicUrl(name).data.publicUrl // path to the image in the bucket 
  }
    
  async getFile(url: string): Promise<any> {
    let response = await fetch(url)
    let file = await response.blob
    return file
  }
  
  async addFiles(files: File[], bucket: string = 'avatars'): Promise<string | undefined> {
    const file = files[0];
    if (!file) return;

    const fileName = `${Date.now()}_${file.name}`;

    const { data, error } = await this.upload(bucket, fileName, file, {
      cacheControl: '3600',
      upsert: true,
    });

    if (error) {
      console.error('Upload error:', error.message);
      return;
    }

    return this.getUrl(bucket, fileName);
  }

  async downloadAndSaveFile(fileName: string, bucket: string = 'avatars'): Promise<void> {
    const { data, error } = await this.download(bucket, fileName);
    if (error) {
      console.error("Error downloading file:", error);
      return;
    }

    // Create a blob URL for the downloaded data
    const blobUrl = URL.createObjectURL(data);

    // Create a temporary <a> to trigger download
    const link = document.createElement('a');
    link.href = blobUrl;
    link.download = fileName; // specify the file name for saving

    document.body.appendChild(link);
    link.click();

    // Clean up
    document.body.removeChild(link);
    URL.revokeObjectURL(blobUrl);
  }

}
