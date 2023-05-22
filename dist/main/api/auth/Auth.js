"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EAuth = void 0;
const SupabaseAuth_1 = require("../auth/SupabaseAuth");
class EAuth {
    async updateUser(user) {
        return await this.auth.updateUser(user);
    }
    async updateCred(key, val) {
        return await this.auth.updateCred(key, val);
    }
    async resetPassword(email) {
        return await this.auth.resetPassword(email);
    }
    auth = SupabaseAuth_1.auth;
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
exports.EAuth = EAuth;
//# sourceMappingURL=Auth.js.map