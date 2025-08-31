import { Client } from "./Client";
import { IClient } from "./IClient";

export class SDKClient extends Client {
    constructor(client: IClient) {
        super(client)
        this.client = client;
    }
    client: IClient;
    rpc(name: string, params?: any) {
        if (this.client.rpc)
        return this.client.rpc(name, params);
    else {
            throw new Error("RPC method not implemented in the client");
        }
    }
    /*constructor(Type: new (connectionDetails: any) => IClient, connectionDetails: any) {
        super(new Type(connectionDetails))
    }*/

    /*yet<T>(claz: new (connectionDetails: any) => T, connectionDetails: any) {
        const obj = new claz(connectionDetails)
        return obj
    }

    async tet<T>(Type: typeof T, query?: any) {
        const data = await this.client.get(`${this.client.baseUrl}/${Type.name}`)
        const dataView =  new Type(data)
        return dataView
    }

    gh = async () => {
        let g = await this.tet(Axiosi)
        let rty = g.actions
    }*/                                 
    
    //tty = this.yet(Client, 'connectionDetails')

    //tryt = this.tty
}