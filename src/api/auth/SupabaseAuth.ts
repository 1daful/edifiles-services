
import { createClient, SignInWithPasswordCredentials, User, UserAttributes, UserResponse } from "@supabase/supabase-js";
import { IAuth } from "../auth/Auth";
export class SupabaseAuth implements IAuth {
  constructor(config: {
    url: string,
    key: string,
    options: any
  }) {
    //if(SupabaseAuth._instance)
    this.supabase = createClient(config.url,
      config.key,
      config.options);
      this.auth = this.supabase.auth
  }

    private static instance?: SupabaseAuth

    supabase

    auth

    authenticated: boolean = false

    //jwt?: string

    async signUp(userCred: SignInWithPasswordCredentials) {
      const { data, error } = await this.auth.signUp(userCred)
      return { data, error }
    }

    async updateUser(user: UserAttributes/*Record<string, any>)*/) {
      const { data, error } = await this.auth.updateUser(user)
      return { data, error }
    }

    async login(providerId: any, userCred?: Record<string, any>) {
        //let provider: Provider = providerId
        let scopes
        switch (providerId) {
            case "google" :
                //provider = 'google'
                scopes = ''
                break;
            case "facebook" :
                //provider = 'facebook'
                scopes = 'public_profile email'
                break;
            case "twitter" :
                //provider = 'twitter'
                scopes = ''
                break;

            default:
              if (userCred) {
                const { data, error } = await this.auth.signInWithPassword({
                    email: userCred.email,
                    password: userCred.password
                  })
              //const jwt = session?.access_token
              this.authenticated = true
              return {data, error}
              }
                break;
        }
        const { data, error } = await this.auth.signInWithOAuth({
            provider: providerId,
            options: {
              scopes: scopes
            }
          })
          /*if (session) {
            const oAuthToken = session.provider_token // use to access provider API
          }*/
          this.authenticated = true
          return {data, error}
    }
    async logout() {
        const { error } = await this.auth.signOut()
        return error
    }
    async getUser(): Promise<UserResponse> {
      return await this.auth.getUser()
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
      if ((await this.getSession()).data.session?.user) {
        return true
      }
      else return false
    }

    isSignedIn() {
      let signedIn = false
      this.auth.onAuthStateChange((event, session) => {
        if (event == 'SIGNED_IN'){
          console.log('SIGNED_IN', session)
        }
      })
      signedIn = true
      return signedIn
    }

    isSignedOut() {
      this.auth.onAuthStateChange((event, session) => {
        if (event == 'SIGNED_OUT') console.log('SIGNED_OUT', session)
      })
    }

    /*isDeleted() {
      this.auth.onAuthStateChange((event, session) => {
        if (event == 'USER_DELETED') console.log('USER_DELETED', session)
      })
    }*/

    async updateCred(key: string, val: string) {
      const { data, error } = await this.auth.updateUser({[key]: val})
      return { data, error }
    }

    async resetPassword(email: string) {
      return this.auth.resetPasswordForEmail(email, {
        redirectTo: "/profile"
      })

      //const { user, session, error } = await this.auth.signIn({ email }, {shouldCreateUser: false})
    }

    async getSession() {
      return await this.auth.getSession()
    }
    
    isNew(user: User) {
      if(user.user_metadata.last_signin === user.user_metadata.created_at) {
        return true
      }
      else {
        return false
      }
    }

}

function getInstance(config: {
  url: string,
  key: string,
  options: any
}) {
  let instance: IAuth;
  return function () {
    if (!instance) {
      instance = new SupabaseAuth(config);
    }
    return instance;
  };
}

export const auth = getInstance
