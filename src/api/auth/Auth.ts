import { auth } from "../auth/SupabaseAuth"
export interface IAuth {
    auth: any;
    signUp(user: any, data: any): Promise<any>
    login(id: string, user: any): void
    logout(): void
    getUser(): void
    isAuthenticated(): Promise<boolean>
    resetPassword(email: string): Promise<any>
    updateUser(user: any): Promise<any>
}

export class EAuth implements IAuth {
    updateUser(): Promise<any> {
        throw new Error("Method not implemented.");
    }
    async resetPassword(email: string): Promise<any> {
        return await this.auth.resetPassword(email)
    }
    auth: IAuth = auth;
    async signUp(user: any, data: any): Promise<any> {
        return await this.auth.signUp(user, data)
    }

    async login(id: string, user: any) {
        await this.auth.login(id, user)
    }
    async logout() {
        await this.auth.logout()
    }
    async getUser() {
        await this.auth.getUser()
    }
    
    async isAuthenticated(): Promise<boolean> {
        return await this.auth.isAuthenticated()
    }
    
}