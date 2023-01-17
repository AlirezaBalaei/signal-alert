const { log, error } = console
const express = require("express")
const app = express()
const cors = require("cors")
const dotenv = require("dotenv")
const ccxt = require("ccxt")

app.use(cors())
app.listen(3000, log("proxy server is running on port: 3000", error))

dotenv.config()

//Instantiated Exchange
const exchangeId = "ascendex",
  exchangeClass = ccxt[exchangeId],
  exchange = new exchangeClass({
    apiKey: process.env.PUBLIC_KEY,
    secret: process.env.API_SECRET_KEY,
  })

//Tulind Functions
const { sma_inc, ema_inc, rsi_inc, macd_inc } = require("./indicators.js")

//Get request formating as: http://127.0.0.1:3000/BTC/USDT/1h"
app.get("/:symbol1/:symbol2/:interval", async (req, res) => {
  try {
    const { symbol1, symbol2, interval } = req.params
    const symbol = `${symbol1}/${symbol2}`
    const data = await fetchKline(symbol, interval)

    // data is in format of: [[kline opentime, Open price,
    // High price, Low price, Close price, Volume]]
    let klinedata = data.map((d) => ({
      time: d[0] / 1000,
      open: d[1] * 1,
      high: d[2] * 1,
      low: d[3] * 1,
      close: d[4] * 1,
    }))
    klinedata = await sma_inc(klinedata)
    klinedata = await ema_inc(klinedata)
    klinedata = await rsi_inc(klinedata)
    klinedata = await macd_inc(klinedata)
    res.status(200).json(klinedata)
  } catch (error) {
    console.log("err: ", error)
    res.send(error)
  }
})

//Fetch Kline using fetch OHLCV
async function fetchKline(symbol, interval) {
  let date = new Date()
  date.setDate(date.getDate() - 14)
  date = date.getTime()
  let output = await exchange.fetchOHLCV(symbol, interval, date, undefined, {
    price: "index",
  })
  return output
}