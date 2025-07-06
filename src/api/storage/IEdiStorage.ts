export interface IEdiStorage {
  create(path: string): Promise<any>
  upload(collName: string, path: string, file: any, options: any): Promise<any>
  download(collName: string, path: string, file: any, options: any): Promise<any>
  getUrl(bucket: string, name: string): Promise<any>
  getFile(url: string): Promise<any>
}
