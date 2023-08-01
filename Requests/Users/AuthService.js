import User from "./User.js"
import Role from "./Role.js"

class PostService {
  
  async createRole(value) {
    try {
        const role = new Role ({value: `${value}`})
        await role.save()
        return role;
    } catch (e) {
        return (`Роль ${value} уже существует`)       
    }

  }
}

export default new PostService();
