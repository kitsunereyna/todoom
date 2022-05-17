const express = require("express");
const router = express.Router();
const AdminController = require("../controller/adminController")

router
.get("/admin", AdminController.displayAdmin)
.get("/api/admin/get/users", AdminController.getAllUsers)
.post("/admin/delete-user", AdminController.deleteUser)
.get("/admin/newUser", AdminController.displayNewUser)
.post("/admin/create/user", AdminController.addNewUser)


module.exports = router;
