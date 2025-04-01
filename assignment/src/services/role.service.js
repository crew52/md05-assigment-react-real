import {axiosInstance} from "../configs/axios.config.js";

class RoleService {
    static async getAllRoles() {
        return await axiosInstance.get('/roles');
    }
}

export default RoleService;