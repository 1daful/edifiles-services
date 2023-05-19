import { auth } from "../auth/SupabaseAuth";
export class EAuth {
    updateUser() {
        throw new Error("Method not implemented.");
    }
    async resetPassword(email) {
        return await this.auth.resetPassword(email);
    }
    auth = auth;
    async signUp(user, data) {
        return await this.auth.signUp(user, data);
    }
    async login(id, user) {
        await this.auth.login(id, user);
    }
    async logout() {
        await this.auth.logout();
    }
    async getUser() {
        await this.auth.getUser();
    }
    async isAuthenticated() {
        return await this.auth.isAuthenticated();
    }
}
