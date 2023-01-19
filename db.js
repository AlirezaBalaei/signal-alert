const dotenv = require("dotenv")
dotenv.config()
const mongodb = require("mongodb").MongoClient

mongodb.connect(
  process.env.CONNECTIONSTRING,
  { useNewUrlParser: true, useUnifiedTopology: true },
  function (err, client) {
    module.exports = client
    const app = require("./app")
    const proxy = require("./proxy")
    // process.env.PORT
    app.listen(process.env.PORT)
    //proxy.listen(process.env.PROXYPORT)
    console.log("connected")
    // testing if db could be read
    client
      .db()
      .collection("users")
      .findOne({ username: "abcd" })
      .then((a) => {
        console.log(a)
      })
  }
)
