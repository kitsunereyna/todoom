const User = require("../models/user.model");

class UserRepository {
  async findAllUsers() {
    try {
      const listOfUsers = await User.find();
      return listOfUsers;
    } catch (error) {
        return error;
    }
  }

  async deleteUserByID(userID){
        try {
            await User.findByIdAndDelete(userID);
            return {success: true};
        } catch (error) {
            return {success: false, error: error};;
        }
  }
}

module.exports = new UserRepository();
