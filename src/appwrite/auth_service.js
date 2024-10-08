import Config from "../config/config";
import { Client, Account, ID } from "appwrite";

export class AuthService{
    client = new Client();
    account;

    constructor() {
        this.client
            .setEndpoint(Config.appwriteUrl)
            .setProject(Config.appwriteProjectId);
        
        this.account = new Account(this.client);
    }

    async createAccount ({email, password, name}) {

        try {
            const userAccount = await this.account.create(ID.unique, email, password, name);
            if (userAccount) {
                //If user account created successfully then log in directly
                return this.logIn(email, password)
            } else {
                return userAccount;
            }
        } catch (error) {
            throw error;
        }
    }

    async logIn (email, password) {
        try {
           return await this.account.createEmailPasswordSession(email, password);
        } catch (error) {
            throw error;
        }
    }

    async getCurrentUser() {
        try {
            return await this.account.get();
        } catch (error) {
            console.log("Error getting from getCurrentUser:"+ error);
            throw error;
        }

        return null;
    }

    async logOut () {
        try {
            return await this.account.deleteSessions();
        } catch (error) {
            console.log("Error getting from getCurrentUser:"+ error);
            throw error;
        }
    }
}

const AuthServiceObj = new AuthService(); 
export default AuthServiceObj;