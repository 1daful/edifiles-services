import { Client } from "./Client";
import { IClient } from "./IClient";

export class SDKClient extends Client {
    constructor(client: IClient) {
        super(client)
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