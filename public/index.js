const { log, error } = console

const getData = async () => {
  const resp = await fetch("http://127.0.0.1:3000/BTCUSDT/1m")
  const data = await resp.json()
  return data
}

// getData();

const renderChart = async () => {
  const chartProperties = {
    timeScale: {
      timeVisible: true,
      secondsVisible: true,
    },
    pane: 0,
  }
  const domElement = document.getElementById("tvchart")
  const chart = LightweightCharts.createChart(domElement, chartProperties)
  const candleseries = chart.addCandlestickSeries()
  const klinedata = await getData()
  candleseries.setData(klinedata)
  //SMA
  const sma_series = chart.addLineSeries({ color: "red", lineWidth: 1 })
  const sma_data = klinedata
    .filter((d) => d.sma)
    .map((d) => ({ time: d.time, value: d.sma }))
  sma_series.setData(sma_data)
}

renderChart()
