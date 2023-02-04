const User = require("../models/User.js")

exports.login = function (req, res) {
  let user = new User(req.body)
  user
    .login()
    .then(function (result) {
      req.session.user = {
        username: user.data.username,
        indicators: user.data.indicators,
        notification: user.data.notification,
        exchange: user.data.exchange,
        avatar: user.avatar,
      }
      req.session.save(function () {
        res.redirect("/")
      })
    })
    .catch(function (err) {
      req.flash("errors", err)
      req.session.save(function () {
        res.redirect("/")
      })
    })
}

exports.logout = function (req, res) {
  req.session.destroy(function () {
    res.redirect("/")
  })
}

exports.register = function (req, res) {
  let user = new User(req.body)
  user
    .register()
    .then(() => {
      req.session.user = { username: user.data.username, avatar: user.avatar }
      req.session.save(function () {
        res.redirect("/")
      })
    })
    .catch((regErrors) => {
      regErrors.forEach(function (error) {
        req.flash("regErrors", error)
      })
      req.session.save(function () {
        res.redirect("/register")
      })
    })
}

exports.homePage = function (req, res) {
  console.log("homePage")
  if (req.session.user) {
    console.log(req.session.user)
    res.render("home-user", {
      username: req.session.user.username,
      avatar: req.session.user.avatar,
    })
  } else {
    res.render("home-guest", { errors: req.flash("errors") })
  }
}

exports.registerPage = function (req, res) {
  if (req.session.user) {
    res.send("Page Not Found!")
  } else {
    res.render("register", { regErrors: req.flash("regErrors") })
  }
}

exports.updateIndicators = function (req, res) {
  console.log(req.body)
  res.redirect("/")
}
