var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import config from "../../../public/config.json";
import { createClient } from "@supabase/supabase-js";
class SupabaseAuth {
    constructor() {
        this.supabase = createClient(config.api.Supabase.url, config.api.Supabase.key, config.api.Supabase.options);
        this.auth = this.supabase.auth;
        this.authenticated = false;
        //if(SupabaseAuth._instance)
    }
    static get Instance() {
        return this._instance || new SupabaseAuth();
    }
    //jwt?: string
    signUp(userCred, data) {
        return __awaiter(this, void 0, void 0, function* () {
            const { user, session, error } = yield this.auth.signUp({
                email: userCred.email,
                password: userCred.password,
            }, {
                data: data
            });
            return { user, session, error };
        });
    }
    updateUser(user /*Record<string, any>)*/) {
        return __awaiter(this, void 0, void 0, function* () {
            const { data, error } = yield this.auth.update(user);
            return { data, error };
        });
    }
    login(providerId, userCred) {
        return __awaiter(this, void 0, void 0, function* () {
            //let provider: Provider = providerId
            let scopes;
            switch (providerId) {
                case "google":
                    //provider = 'google'
                    scopes = '';
                    break;
                case "facebook":
                    //provider = 'facebook'
                    scopes = 'public_profile email';
                    break;
                case "twitter":
                    //provider = 'twitter'
                    scopes = '';
                    break;
                default:
                    if (userCred) {
                        const { user, session, error } = yield this.auth.signIn({
                            email: userCred.email,
                            password: userCred.password
                        });
                        //const jwt = session?.access_token
                        this.authenticated = true;
                        return { user, session, error };
                    }
                    break;
            }
            const { user, session, error } = yield this.auth.signIn({
                provider: providerId
            }, {
                scopes: scopes
            });
            /*if (session) {
              const oAuthToken = session.provider_token // use to access provider API
            }*/
            this.authenticated = true;
            return { user, session, error };
        });
    }
    logout() {
        return __awaiter(this, void 0, void 0, function* () {
            const { error } = yield this.auth.signOut();
            return error;
        });
    }
    getUser() {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.auth.user();
            return user;
        });
    }
    isAuthenticated() {
        return __awaiter(this, void 0, void 0, function* () {
            //let sess
            /*this.auth.onAuthStateChange((event, session) => {
              this.authenticated = true
              console.log("event and session")
              console.log(event, session)
              sess = session
            })
            console.log("session: ", sess)
            return this.authenticated*/
            if (this.startSession()) {
                return true;
            }
            else
                return false;
        });
    }
    isSignedIn() {
        let signedIn = false;
        this.auth.onAuthStateChange((event, session) => {
            if (event == 'SIGNED_IN') {
                console.log('SIGNED_IN', session);
            }
        });
        signedIn = true;
        return signedIn;
    }
    isSignedOut() {
        this.auth.onAuthStateChange((event, session) => {
            if (event == 'SIGNED_OUT')
                console.log('SIGNED_OUT', session);
        });
    }
    isDeleted() {
        this.auth.onAuthStateChange((event, session) => {
            if (event == 'USER_DELETED')
                console.log('USER_DELETED', session);
        });
    }
    updateCred(key, val) {
        return __awaiter(this, void 0, void 0, function* () {
            const { data, user, error } = yield this.auth.update({ [key]: val });
            return { data, user, error };
        });
    }
    resetPassword(email) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.auth.api.resetPasswordForEmail(email, {
                redirectTo: "/profile"
            });
            //const { user, session, error } = await this.auth.signIn({ email }, {shouldCreateUser: false})
        });
    }
    startSession() {
        var _a;
        return (_a = this.auth.session()) === null || _a === void 0 ? void 0 : _a.user;
    }
    isNewUser(user) {
        if (user.user_metadata.last_signin === user.user_metadata.created_at) {
            return true;
        }
        else {
            return false;
        }
    }
}
export const auth = SupabaseAuth.Instance;
