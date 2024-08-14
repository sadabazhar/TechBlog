import Config from "../config/config";
import { Client, Databases, Query } from "appwrite";

export class PostService{
    client = new Client();
    databases;
    storage;

    constructor(){
        this.client
            .setEndpoint(Config.appwriteUrl)
            .setProject(Config.appwriteProjectId);
            this.databases = new Databases(this.client);
    }


    async createPost({title, slug, content, featuredImages, status, usedId}){
        try {
            return await this.databases.createDocument(
                Config.appwriteDatabaseId,
                Config.appwriteCollectionId,
                slug,
                {
                    title, 
                    content,
                    featuredImages,
                    status,
                    userId: usedId
                }
            )
        } catch (error) {
            console.log("Error from createPost: " + error);
        }
    }

    async updatePost(slug, {title, content, featuredImages, status}){
        try {
            return await this.databases.updateDocument(
                Config.appwriteDatabaseId,
                Config.appwriteCollectionId,
                slug,
                {
                    title, 
                    content,
                    featuredImages,
                    status
                }
            )
        } catch (error) {
            console.log("Error from updatePost: " + error);
            
        }
    }

    async deletePost(slug){
        try {
            await this.databases.deleteDocument(
                Config.appwriteDatabaseId,
                Config.appwriteCollectionId,
                slug
            )
            return true;

        } catch (error) {
            console.log("Error from deletePost: " + error);
            return false;
        }
    }

    async getPosts(slug){
        try {
            return await this.databases.getDocument(
                Config.appwriteDatabaseId,
                Config.appwriteCollectionId,
                slug
            )
        } catch (error) {
            console.log("Error from getPost: "+ error);
            return false;
        }
    }

    async getAllPosts(queries = [Query.equal("status", "active")]){
        try {
            return await this.databases.listDocuments(
                Config.appwriteDatabaseId,
                Config.appwriteCollectionId,
                queries,
                new Query().setLimit(50)
            )
        } catch (error) {
            console.log("Error from getAllPosts: " + error);
            return false;
        }
    }

}
const PostServiceObj = new PostService();
export default PostServiceObj;