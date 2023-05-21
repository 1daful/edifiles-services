"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.auth = void 0;
const config_json_1 = __importDefault(require("../../utility/config.json"));
const supabase_js_1 = require("@supabase/supabase-js");
class SupabaseAuth {
    constructor() {
        //if(SupabaseAuth._instance)
    }
    static _instance;
    static get Instance() {
        return this._instance || new SupabaseAuth();
    }
    supabase = (0, supabase_js_1.createClient)(config_json_1.default.api.Supabase.url, config_json_1.default.api.Supabase.key, config_json_1.default.api.Supabase.options);
    auth = this.supabase.auth;
    authenticated = false;
    //jwt?: string
    async signUp(userCred) {
        const { data, error } = await this.auth.signUp(userCred);
        return { data, error };
    }
    async updateUser(user /*Record<string, any>)*/) {
        const { data, error } = await this.auth.updateUser(user);
        return { data, error };
    }
    async login(providerId, userCred) {
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
                    const { data, error } = await this.auth.signInWithPassword({
                        email: userCred.email,
                        password: userCred.password
                    });
                    //const jwt = session?.access_token
                    this.authenticated = true;
                    return { data, error };
                }
                break;
        }
        const { data, error } = await this.auth.signInWithOAuth({
            provider: providerId,
            options: {
                scopes: scopes
            }
        });
        /*if (session) {
          const oAuthToken = session.provider_token // use to access provider API
        }*/
        this.authenticated = true;
        return { data, error };
    }
    async logout() {
        const { error } = await this.auth.signOut();
        return error;
    }
    async getUser() {
        const { data, error } = await this.auth.getUser();
        return { user: data.user, error };
    }
    async isAuthenticated() {
        //let sess
        /*this.auth.onAuthStateChange((event, session) => {
          this.authenticated = true
          console.log("event and session")
          console.log(event, session)
          sess = session
        })
        console.log("session: ", sess)
        return this.authenticated*/
        if ((await this.startSession()).data.session?.user) {
            return true;
        }
        else
            return false;
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
    /*isDeleted() {
      this.auth.onAuthStateChange((event, session) => {
        if (event == 'USER_DELETED') console.log('USER_DELETED', session)
      })
    }*/
    async updateCred(key, val) {
        const { data, error } = await this.auth.updateUser({ [key]: val });
        return { data, error };
    }
    async resetPassword(email) {
        return this.auth.resetPasswordForEmail(email, {
            redirectTo: "/profile"
        });
        //const { user, session, error } = await this.auth.signIn({ email }, {shouldCreateUser: false})
    }
    async startSession() {
        return (await this.auth.getSession());
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
exports.auth = SupabaseAuth.Instance;
//# sourceMappingURL=SupabaseAuth.js.map