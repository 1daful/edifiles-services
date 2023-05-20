export interface IAuth {
    auth: any;
    signUp(user: any, data: any): Promise<any>;
    login(id: string, user: any): void;
    logout(): void;
    getUser(): any;
    isAuthenticated(): Promise<boolean>;
    resetPassword(email: string): Promise<any>;
    updateUser(user: any): Promise<any>;
}
export declare class EAuth implements IAuth {
    updateUser(): Promise<any>;
    resetPassword(email: string): Promise<any>;
    auth: IAuth;
    signUp(user: any, data: any): Promise<any>;
    login(id: string, user: any): Promise<void>;
    logout(): Promise<void>;
    getUser(): Promise<void>;
    isAuthenticated(): Promise<boolean>;
}
