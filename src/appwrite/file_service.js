import Config from "../config/config";
import { Client, ID, Storage } from "appwrite";

export class FileService{
    client = new Client();
    databases;
    storage;

    constructor(){
        this.client
            .setEndpoint(Config.appwriteUrl)
            .setProject(Config.appwriteProjectId);
            this.storage = new Storage(this.client);
    }

    async uploadFile(file){
        try {
            return await this.storage.createFile(
                Config.appwriteBucketId,
                ID.unique,
                file,
            )
        } catch (error) {
            console.log("Error from uploadFile: " + error);
            return false;
        }
    }

    async deleteFile(fileId){
        try {
            await this.storage.deleteFile(
                Config.appwriteBucketId,
                fileId
            )
            return true;
        }
        catch (error) {
            console.log("Error from deleteFile: " + error);
            return false;
        }
    }

    async getFile(fileId){
        try {
            return await this.storage.getFile(
                Config.appwriteBucketId,
                fileId
            )
        } catch (error) {
            console.log("Error from getFile: " + error);
            return false;
        }
    }

}

const FileServiceObj = new FileService();
export default FileServiceObj;