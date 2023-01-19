const express = require("express")
const session = require("express-session")
const MongoStore = require("connect-mongo")
const flash = require("connect-flash")
const app = express()

let sessionOptions = session({
  secret:
    "J3tQkHWZQy8yHcbCTxpuQZZzB2TFGfMaU4Tccs8GjR3vZ7KiYzu97BqCB7Awg8LKMeFUZWi2F7G8fU929xiFYBSqmd8Nt3f3PS7mgFDaR",
  store: MongoStore.create({ client: require("./db") }),
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 1000 * 60 * 60 * 24, httpOnly: true },
})

const router = require("./router.js")

app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(express.static("./public"))
app.use(sessionOptions)
app.use(flash())

app.use("/", router)
app.use("/register", router)

app.set("views", "views")
app.set("view engine", "ejs")

module.exports = app
