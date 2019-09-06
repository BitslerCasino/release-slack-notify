const coins = {
  "bitcoin": "https://github.com/bitcoin/bitcoin",
  "ethereum": "https://github.com/paritytech/parity-ethereum",
  "litecoin": "https://github.com/litecoin-project/litecoin",
  "bitcoincash": "https://github.com/Bitcoin-ABC/bitcoin-abc",
  "ripple": "https://github.com/uniibu/ripplet",
  "dogecoin": "https://github.com/dogecoin/dogecoin",
  "dash": "https://github.com/dashpay/dash",
  "eos": "https://github.com/uniibu/eos",
  "stellar": "https://github.com/uniibu/stellar-wallet",
  "bitcoingold": "https://github.com/BTCGPU/BTCGPU",
  "digibyte": "https://github.com/digibyte/digibyte",
  "bitcoinsv": "https://github.com/bitcoin-sv/bitcoin-sv",
  "zcash": "https://github.com/zcash/zcash"
}
const symbols = {
  "bitcoin": "btc",
  "ethereum": "eth",
  "litecoin": "ltc",
  "bitcoincash": "bch",
  "ripple": "xrp",
  "dogecoin": "doge",
  "dash": "dash",
  "eos": "eos",
  "stellar": "xlm",
  "bitcoingold": "btg",
  "digibyte": "dgb",
  "bitcoinsv": "bsv",
  "zcash": "zec"
}
exports.currencies = Object.keys(coins).map(curr => {
  return {
    "url": coins[curr],
    "name": curr,
    "webhookUrl": process.env.API_URL,
    "symbol": symbols[curr],
    "icon": "https://www.bitsler.com/img/currencies/" + symbols[curr] + ".png",
    "interval": process.env.NODE_ENV === 'production' ? 60:20
  }
})

const wallets = {
  "btc": "Satoshi:0.18.0",
  "eth": "Parity 2.5.7",
  "ltc": "LitecoinCore:0.17.1",
  "bch": "Bitcoin ABC:0.20.0(EB32.0)",
  "doge": "Shibetoshi:1.14.0",
  "dash": "Dash Core:0.14.0.1",
  "bsv": "Bitcoin SV:0.2.0(EB2000.0)",
  "zec": "MagicBean:2.0.7-2",
  "etc": "Parity 2.4.7",
  "btg": "Bitcoin Gold:0.15.2",
  "dgb": "DigiByte:7.17.2"
}

exports.coinVersions = function(){
  const w = Object.assign({},wallets);
  for(var [k,v] of Object.entries(w)){
   w[k] = v.replace(/[a-z: ]/ig,'').replace(/\(.+\)/g,"")
   if(k == 'dash') {
     w[k] = w[k].replace(/^0\./,'');
   }
  }
  return w;
}