const { log, error } = console
const express = require("express")
const app = express()
const server = app.listen(
  3000,
  log("proxy server is running on port: 3000", error)
)

app.get("/", (req, res) => {
  res.status(200).send("proxy server works")
})
