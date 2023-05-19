import { SignInWithPasswordCredentials, User, UserAttributes } from "@supabase/supabase-js";
import { IAuth } from "../auth/Auth";
declare class SupabaseAuth implements IAuth {
    constructor();
    private static _instance?;
    static get Instance(): SupabaseAuth;
    supabase: import("@supabase/supabase-js").SupabaseClient<any, string, any>;
    auth: import("@supabase/supabase-js/dist/module/lib/SupabaseAuthClient").SupabaseAuthClient;
    authenticated: boolean;
    signUp(userCred: SignInWithPasswordCredentials): Promise<{
        data: {
            user: User | null;
            session: import("@supabase/supabase-js").AuthSession | null;
        } | {
            user: null;
            session: null;
        };
        error: import("@supabase/supabase-js").AuthError | null;
    }>;
    updateUser(user: UserAttributes): Promise<{
        data: {
            user: User;
        } | {
            user: null;
        };
        error: import("@supabase/supabase-js").AuthError | null;
    }>;
    login(providerId: any, userCred?: Record<string, any>): Promise<{
        data: {
            user: User | null;
            session: import("@supabase/supabase-js").AuthSession | null;
        } | {
            user: null;
            session: null;
        };
        error: import("@supabase/supabase-js").AuthError | null;
    } | {
        data: {
            provider: import("@supabase/supabase-js").Provider;
            url: string;
        } | {
            provider: import("@supabase/supabase-js").Provider;
            url: null;
        };
        error: import("@supabase/supabase-js").AuthError | null;
    }>;
    logout(): Promise<import("@supabase/supabase-js").AuthError | null>;
    getUser(): Promise<import("@supabase/supabase-js").UserResponse>;
    isAuthenticated(): Promise<boolean>;
    isSignedIn(): boolean;
    isSignedOut(): void;
    updateCred(key: string, val: string): Promise<{
        data: {
            user: User;
        } | {
            user: null;
        };
        error: import("@supabase/supabase-js").AuthError | null;
    }>;
    resetPassword(email: string): Promise<{
        data: {};
        error: null;
    } | {
        data: null;
        error: import("@supabase/supabase-js").AuthError;
    }>;
    startSession(): Promise<{
        data: {
            session: import("@supabase/supabase-js").AuthSession;
        };
        error: null;
    } | {
        data: {
            session: null;
        };
        error: import("@supabase/supabase-js").AuthError;
    } | {
        data: {
            session: null;
        };
        error: null;
    }>;
    isNewUser(user: User): boolean;
}
export declare const auth: SupabaseAuth;
export {};
