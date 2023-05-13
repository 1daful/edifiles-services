export interface IEdiStorage {
  upload(collName: string, path: string, file: any): Promise<any>
  download(collName: string, path: string, file: any): Promise<any>
}
