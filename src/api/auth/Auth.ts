import { auth } from "../auth/SupabaseAuth"
export interface IAuth {
    auth: any;
    signUp(user: any, data: any): Promise<any>
    login(id: string, user?: any): any
    logout(): void
    getUser(): Promise<any>
    isNew(user: any): Boolean
    isAuthenticated(): Promise<boolean>
    resetPassword(email: string): Promise<any>
    updateUser(user: any): Promise<any>
    updateCred(key: string, val: string): Promise<any>
}

export class EAuth implements IAuth {
    constructor(config: any) {
        this.getAuth = auth(config);
        this.auth = this.getAuth()
    }
    getAuth
    async updateUser(user: any): Promise<any> {
        return await this.auth.updateUser(user)
    }

    async updateCred(key: string, val: string): Promise<any> {
        return await this.auth.updateCred(key, val)
    }

    async resetPassword(email: string): Promise<any> {
        return await this.auth.resetPassword(email)
    }
    auth: IAuth;
    async signUp(user: any, data: any): Promise<any> {
        return await this.auth.signUp(user, data)
    }

    async login(id: string, user?: any) {
        await this.auth.login(id, user)
    }
    async logout() {
        await this.auth.logout()
    }
    async getUser(): Promise<any> {
        await this.auth.getUser()
    }
    
    isNew(user: any) {
        return this.auth.isNew(user)
    }

    async isAuthenticated(): Promise<boolean> {
        return await this.auth.isAuthenticated()
    }
    
}