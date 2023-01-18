const dotenv = require("dotenv")
dotenv.config()
const mongodb = require("mongodb").MongoClient

mongodb.connect(
  process.env.CONNECTIONSTRING,
  { useNewUrlParser: true, useUnifiedTopology: true },
  function (err, client) {
    module.exports = client
    const app = require("./app")
    // process.env.PORT
    app.listen(4000)
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
