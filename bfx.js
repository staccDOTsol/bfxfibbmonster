'use strict'

require('dotenv').config()

const BFX = require('./node_modules/bitfinex-api-node')
const SocksProxyAgent = require('socks-proxy-agent')

const { API_KEY, API_SECRET, REST_URL, WS_URL, SOCKS_PROXY_URL } = process.env
const agent = SOCKS_PROXY_URL ? new SocksProxyAgent(SOCKS_PROXY_URL) : null

const bfx = new BFX({
  apiKey: API_KEY,
  apiSecret: API_SECRET,

  ws: {
    url: "wss://api.ethfinex.com/ws/2",
    agent
  },

  rest: {
    url: "https://api.ethfinex.com",
    agent
  }
})

module.exports = bfx