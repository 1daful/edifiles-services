import { IRepository } from "./IRepository";

export class Gorsedb implements IRepository {
    addItem(item?: Record<string, any> | undefined): void {
        throw new Error("Method not implemented.");
    }
    addItems(param: Record<string, any>[], collName?: string | undefined): void {
        throw new Error("Method not implemented.");
    }
    readItem(collName?: string | undefined): Promise<Record<string, any>> {
        throw new Error("Method not implemented.");
    }
    readItems(collName?: string | undefined, params?: string[] | undefined, op?: Record<string, any> | undefined): Promise<Record<string, any>[]> {
        throw new Error("Method not implemented.");
    }
    updateItem(docId: any, param: Record<string, any>, collName?: string | undefined): void {
        throw new Error("Method not implemented.");
    }
    deleteItem(docId: any, collName?: string | undefined): void {
        throw new Error("Method not implemented.");
    }
    find(filters?: Record<string, any> | undefined, collName?: string | undefined): Promise<any> {
        throw new Error("Method not implemented.");
    }
    search(field: string, query: string, collName?: string | undefined): Promise<any> {
        throw new Error("Method not implemented.");
    }
}