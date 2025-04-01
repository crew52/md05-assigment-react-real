
import {axiosInstance} from "../configs/axios.config.js";

class UserService {
    static async getAllUser() {
        return await axiosInstance.get("/users?_expand=role")
    }

    static async deleteUserById(id) {
        return await axiosInstance.delete(`/users/${id}`)
    }

    static async createUser(data) {
        return await axiosInstance.post("/users", data)
    }

    static async updateUser(data, id) {
        return await axiosInstance.put(`/users/${id}`, data)
    }

    static async getUserById(id) {
        return await axiosInstance.get(`/users/${id}?_expand=role`)
    }

    static async updateRatingUser(newRating, id){
        return await axiosInstance.patch(`/users/${id}`, {rating: newRating})
    }

    static async searchUserByName(name) {
        return await axiosInstance.get(`/users?name_like=${name}&_expand=role`)
    }
}

export default UserService;