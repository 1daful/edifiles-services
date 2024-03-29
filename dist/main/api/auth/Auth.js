"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EAuth = void 0;
const SupabaseAuth_1 = require("../auth/SupabaseAuth");
class EAuth {
    constructor(config) {
        this.getAuth = (0, SupabaseAuth_1.auth)(config);
        this.auth = this.getAuth();
    }
    getAuth;
    async getSession() {
        return await this.auth.getSession();
    }
    async updateUser(user) {
        return await this.auth.updateUser(user);
    }
    async updateCred(key, val) {
        return await this.auth.updateCred(key, val);
    }
    async resetPassword(email) {
        return await this.auth.resetPassword(email);
    }
    auth;
    async signUp(user, data) {
        return await this.auth.signUp(user, data);
    }
    async login(id, user) {
        return await this.auth.login(id, user);
    }
    async logout() {
        return await this.auth.logout();
    }
    async getUser() {
        return await this.auth.getUser();
    }
    isNew(user) {
        return this.auth.isNew(user);
    }
    async isAuthenticated() {
        return await this.auth.isAuthenticated();
    }
}
exports.EAuth = EAuth;
//# sourceMappingURL=Auth.js.map