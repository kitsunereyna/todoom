const UserRepository = require("../repository/userRepository");
const alert = require("alert");
const bcrypt = require("bcryptjs");
const User = require("../models/user.model");


class AdminController {
  async addNewUser(req, res) {
    const email = req.body.email;
    const city = req.body.city;
    const name = req.body.name;
    const password = req.body.password;

    try {
      const cryptedPassword = await bcrypt.hash(password, 10);
      await User.create({
        userName: name,
        userEmail: email,
        userCity: city,
        userPassword: cryptedPassword,
        isAdmin: false,
      });

      res.redirect("/admin");
    } catch (error) {
      alert(error);
      res.redirect("/admin/newUser");
    }
  }



  displayNewUser(req, res) {
    res.render("newUser");
  }

  displayAdmin(req, res) {
    res.render("admin");
  }

  async getAllUsers(req, res) {
    try {
      const listOfUsers = await UserRepository.findAllUsers();
      res.send(listOfUsers);
    } catch (error) {
      res.send(error);
    }
  }

  async deleteUser(req, res) {
    try {
      const userID = req.body.userID;
      const response = await UserRepository.deleteUserByID(userID);
      if (response.success) {
        res.send({ success: true });
      } else res.send({ success: false, error: response.error });
    } catch (error) {
      res.send(error);
    }
  }
}

module.exports = new AdminController();
