const express = require("express")
const { indicators } = require("tulind")
const router = express.Router()
const userController = require("./controllers/userController")

router.get("/", userController.homePage)
router.get("/register", userController.registerPage)

router.post("/register", userController.register)
router.post("/login", userController.login)
router.post("/logout", userController.logout)
router.post("/update-indicators", userController.updateIndicators)

module.exports = router
