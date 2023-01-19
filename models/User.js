const bcrypt = require("bcryptjs")
const usersCollection = require("../db").db().collection("users")
const validator = require("validator")

let User = function (data) {
  this.data = data
  this.errors = []
}
User.prototype.cleanUp = function () {
  if (typeof this.data.username != "string") this.data.username = ""
  if (typeof this.data.email != "string") this.data.email = ""
  if (typeof this.data.password != "string") this.data.password = ""
  if (typeof this.data.exchange != "string") this.data.exchange = ""
  if (typeof this.data.publickey != "string") this.data.publickey = ""
  if (typeof this.data.apisecretkey != "string") this.data.apisecretkey = ""

  // get rid of any bogus property
  this.data = {
    username: this.data.username.trim().toLowerCase(),
    email: this.data.email.trim().toLowerCase(),
    password: this.data.password,
    exchange: this.data.exchange,
    publickey: this.data.publickey,
    apisecretkey: this.data.apisecretkey,
  }
}

User.prototype.validate = function () {
  return new Promise(async (resolve, reject) => {
    if (this.data.username == "") {
      this.errors.push("choose a username")
    }
    if (
      this.data.username != "" &&
      !validator.isAlphanumeric(this.data.username, "en-US")
    ) {
      this.errors.push("username should only contain characters and numbers")
    }
    if (!validator.isEmail(this.data.email)) {
      this.errors.push("you need enter an email")
    }
    if (this.data.password == "") {
      this.errors.push("you need to choose a password")
    }
    if (this.data.password.length > 0 && this.data.password.length < 8) {
      this.errors.push("password should have at least 8 characters")
    }
    if (this.data.password.length > 50) {
      this.errors.push("password can't be more than 50 characters")
    }
    if (this.data.username.length > 0 && this.data.username.length < 3) {
      this.errors.push("username should have at least 3 characters")
    }
    if (this.data.username.length > 30) {
      this.errors.push("username can't be more than 30 characters")
    }

    // if user name is valid check to see if it's already taken
    if (
      this.data.username.length > 2 &&
      this.data.username.length < 31 &&
      validator.isAlphanumeric(this.data.username, "en-US")
    ) {
      let usernameExists = await usersCollection.findOne({
        username: this.data.username,
      })
      if (usernameExists) this.errors.push("this username is already reserved")
    }

    // if email is valid check to see if it's already taken
    if (validator.isEmail(this.data.email)) {
      let emailExists = await usersCollection.findOne({
        email: this.data.email,
      })
      if (emailExists) this.errors.push("this email is already registered")
    }

    // if exchange, publickey, apisecret was empty push error
    if (this.data.exchange == "") {
      this.errors.push("choose an exchange")
    }
    if (this.data.publickey == "") {
      this.errors.push("choose an publickey")
    }
    if (this.data.apisecretkey == "") {
      this.errors.push("choose an apisecretkey")
    }
    resolve()
  })
}

User.prototype.login = function () {
  return new Promise((resolve, reject) => {
    this.cleanUp()
    usersCollection
      .findOne({ username: this.data.username })
      .then((attemptedUser) => {
        if (
          attemptedUser &&
          bcrypt.compareSync(this.data.password, attemptedUser.password)
        ) {
          resolve("You Logged in . . .")
        } else {
          reject("username / password is wrong")
        }
      })
      .catch(function () {
        reject("try again later")
      })
  })
}

User.prototype.register = function () {
  return new Promise(async (resolve, reject) => {
    // step #1: Validate user data
    this.cleanUp()
    await this.validate()
    // step #2: Only if there are no validation Errors
    // then save the user in an data base
    if (!this.errors.length) {
      let salt = bcrypt.genSaltSync(10)
      this.data.password = bcrypt.hashSync(this.data.password, salt)
      await usersCollection.insertOne(this.data)
      resolve()
    } else {
      reject(this.errors)
    }
  })
}

module.exports = User
