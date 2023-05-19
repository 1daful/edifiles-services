var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { auth } from "../auth/SupabaseAuth";
export class EAuth {
    constructor() {
        this.auth = auth;
    }
    updateUser() {
        throw new Error("Method not implemented.");
    }
    resetPassword(email) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.auth.resetPassword(email);
        });
    }
    signUp(user, data) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.auth.signUp(user, data);
        });
    }
    login(id, user) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.auth.login(id, user);
        });
    }
    logout() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.auth.logout();
        });
    }
    getUser() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.auth.getUser();
        });
    }
    isAuthenticated() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.auth.isAuthenticated();
        });
    }
}
