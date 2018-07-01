const Poloniex = require('poloniex-api-node');
const tw = require('./trendyways.js');
var MongoClient = require('mongodb').MongoClient;
let poloniex
				var bestAsk = []

				const ccxt = require ('ccxt');

				var bestBid = []
				const bfx = require('./bfx.js')
let bitfinexapi = new ccxt.bitfinex ({
        apiKey: 'dF16tezPk2yu5UmkoYXK9VyBLfdrdYeklj39xb27dsW',
        secret: process.env.bkey2,
    })

const ws = bfx.ws(2, {
	apiKey: 'HVMS8vO3S1gJQTv7ETZhMCVzMP4q49MmVnjqL9PEoMj', apiSecret: process.env.bkey,
  manageCandles: true, // enable candle dataset persistence/management
  transform: true // 
  })
const { Order } = require('./node_modules/bitfinex-api-node/lib/models')

const { MarginInfo } = require('./node_modules/bitfinex-api-node/lib/models')
const { CancelOrder }  = require('./node_modules/bitfinex-api-node/lib/models')
var startDate = new Date();
const CANDLE_KEY = 'trade:1m:tBTCUSD'
const rest = bfx.rest(2, {
apiKey: 'HVMS8vO3S1gJQTv7ETZhMCVzMP4q49MmVnjqL9PEoMj', apiSecret: process.env.bkey});
var keys = []
var keys2 = []
ws.on('open', () => {
  ws.auth()
    //console.log('open')
	rest.calcAvailableBalance('tBTCUSD', 1, 0.090072, 'MARGIN').then(balances => {
	//console.log(balances[0]);
	})
    rest.symbols().then(symbols => {
        for (var s in symbols) {
            // //console.log('t' + symbols[s].toUpperCase());
			if ( symbols[s].toUpperCase().slice(-3) == "ETH" ||  symbols[s].toUpperCase().slice(-3) == "BTC" ||  symbols[s].toUpperCase().slice(-3) == "USD"){
            keys.push('trade:1m:t' + symbols[s].toUpperCase());
			keys2.push('t' + symbols[s].toUpperCase());
			subs(symbols[s].toUpperCase(), symbols.length);
			
	
			}
        }/*
			ws.subscribeTicker("tBTCUSD");
		ws.subscribeTicker("tETHUSD");
		tickerticker("tBTCUSD");
		tickerticker("tETHUSD");
		for (var k in keys) {
			console.log(keys2[k]);	
		ws.subscribeTicker(keys2[k]);
			tickerticker(keys2[k]);
			
		}*/
        for (var k in keys) {
			
            ////console.log(keys[k]);
			lpa[keys[k]] = null 
			lpb[keys[k]] = null 
			prevTS[keys[k]] = null
        }
		
		//prod
		setTimeout(function(){
		dbo.listCollections().toArray(function(err, collInfos) {
        // collInfos is an array of collection info objects that look like:
        // { name: 'test', options: {} }
        for (col in collInfos) {

            dbs.push(collInfos[col].name);
            collections.push(dbo.collection(collInfos[col].name));
        }
        ////////console.log(dbs);
		for (var c in collections){
			var collection = collections[c];
                collection.find({

                }, {
                    $exists: true
                }).sort({
                    _id: -1

                }).toArray(function(err, doc3) {
        ////////console.log(dbs);
		ws.subscribeTicker("tBTCUSD");
		ws.subscribeTicker("tETHUSD");
		tickerticker("tBTCUSD");
		tickerticker("tETHUSD");
		for (var d in doc3){
						if (doc3[d].trades.k == 'tZCNETH'){
							console.log('tZCNETH');
						}
					subs(doc3[d].trades.k, 0);
					}
				});
		}
		});
	
	}, 2000);
    }).catch(err => {
        console.log(err);
    })
})
function subs(ss, count){
	if (!activeOrders.includes(ss) && count <= 3){
	setTimeout(function(){
		
            ws.subscribeTicker( ss) //'trade:1m:' + 
			tickerticker(ss);
			subs(ss, count + 1);
}, Math.random() * 2000 * 40); 
	}
}
var tickers = []
	var winners = {};
	var winnas = []
function tickerticker(k){
	
ws.onTicker({ symbol: k }, (ticker) => {
	if (k == 'tZCNETH'){
		console.log(k);
	}
	if (btcusd != 0&& ethusd != 0){
		
	if (k.slice(-3)== "USD"){
						var amt = btcusd;
					if (!volKs.includes(k) && ((ticker.volume * ticker.ask) / amt)){						
					volKs.push(k);
						volTot += (ticker.volume * ticker.ask) / amt;
					}
					}
					else if (k.slice(-3)== "ETH"){
						var amt = ethusd;
					if (!volKs.includes(k) && ((ticker.volume * ticker.ask) / amt)){						
	
					volKs.push(k);
						volTot += (ticker.volume * ticker.ask) / amt;
					}
					}
					else if (k.slice(-3)== "BTC"){
						var amt = 1;
					if (!volKs.includes(k) && ((ticker.volume * ticker.ask) / amt)){						

					volKs.push(k);
						volTot += (ticker.volume * ticker.ask) / amt;
					}
					}
					var avg = volTot / volKs.length;
					if ((ticker.volume * ticker.ask) / amt > (avg / 20)){
						
						if (!tickers.includes('trade:1m:' + k)){
							console.log(k);
						tickers.push('trade:1m:' + k)
						bestAsk[k] = ticker.ask;
						bestBid[k] = ticker.bid;
						avg = ((parseFloat(ticker['high']) + parseFloat(ticker['low'])) / 2);
						
						if (parseFloat(ticker.lastPrice) <= avg){
							var trend = 'DOWNTREND';
						}else {
							var trend = 'UPTREND';
						}
						var sfibb = [];
						 sfibb.push({
							h: parseFloat(ticker['high']),
							l: parseFloat(ticker['low'])
						})
							var f = fibonacciRetrs(sfibb, trend)[0];
							var lesser = []
							var greater = []
							for (var fibb in f){
									if (f[fibb] <= parseFloat(ticker.lastPrice)){
										lesser.push(f[fibb]);
									}
									else {
										greater.push(f[fibb]);
									}
							}
							winners[k] = {}
							if ((greater.length >= 1 && lesser.length >= 1)){
								
								var collection = dbo.collection(k);
								if (greater[0] != undefined){
									winners[k].sell1 = greater[0]
								}
								if (greater[1] != undefined){
									winners[k].sell2 = greater[1]
									
								}
								if (lesser[0] != undefined){
									winners[k].buy1 = lesser[0]
									winners[k].sl = lesser[0] * 0.01; //0.93
									
								}
								if (lesser[1] != undefined){
									winners[k].buy2 = lesser[1]
									winners[k].sl = lesser[1] * 0.01; //.93
									
								}
								
								winners[k].bought1 = false;
								winners[k].bought2 = false;
								winners[k].sold1 = false;
								winners[k].sold2 = false;
								winners[k].k = k;
								winners[k].currencyPair = k;
								
								
								winners[k].cancelled = false;
									if (!winnas.includes(k)){
										winnas.push(k);
															
									
								//insert(winners[k], collection);
									}
									updateStoplimits(winners[k], collection);
								}
									
						}
					}
	} else {
		if (k == "tBTCUSD"){
			btcusd = ticker.ask;
		}
		else if (k == "tETHUSD"){
			ethusd = ticker.ask;
		}
	}
});
}
ws.once('auth', () => {
//console.log('auth');
});
function buy(k, rate, rate2){ //rate2 for buy is higher
	setTimeout(function(){
		try{
	if (!activeOrders.includes(k)){
		  console.log('buy buy !! ' + k + ' ' + (rate));
	activeOrders.push(k);
	//console.log(activeOrders);
	
	rest.calcAvailableBalance(k, 1, rate, 'MARGIN').then(balances => {
	//console.log(balances[0]);
		var amt = balances[0] / 10;
		//console.log(amt);
		for (var v in activeOrders){
			if (v >= 22){
			amt = amt * 1.1;
			}
		}
	
		//console.log(amt);
		    console.log('buyl price: ' + ((rate)) + ' amount ' + amt);

  const o = new Order({
    cid: Date.now(),
    symbol: k,
    price: rate,
    amount: amt ,
    type: Order.type.LIMIT
  }, ws)

  let closed = false

  // Enable automatic updates
  o.registerListeners()

o.on('error', () => {
	console.log('error');
});
  o.on('update', () => {
    console.log('order updated: %j', o.serialize())
	var os = 0;
	if (parseFloat(o.serialize()[6]) == 0){
		os = (parseFloat(o.serialize()[7]));
	}else {
		os = parseFloat(o.serialize()[6]);
	}
	if (o.serialize().toString().indexOf('EXECUTED') != -1){
		console.log(k);
    console.log('sell price: ' + ((rate * 1.007)) + ' amount ' + (-1 * os));

   const o2 = new Order({
    cid: Date.now(),
    symbol: k,
    price: (rate2),
    amount: (-1 * os),
    type: Order.type.LIMIT
  }, ws)

  let closed2 = false

  // Enable automatic updates
  o2.registerListeners()

o2.on('error', () => {
	console.log('error');
});
  o2.on('update', () => {
    console.log('order updated: %j', o2.serialize())
  })

  o2.on('close', () => {
	  
    console.log('order closed: %s', o2.status)
	activeOrders.splice( k, 1 );
	//console.log(activeOrders);
var collection = dbo.collection(k);
		collection.find({

                }, {
                    $exists: true
                }).sort({
                    _id: -1

                }).toArray(function(err, doc3) {
                    for (var d in doc3) {
						if (doc3[d].trades){
							doc3[d].trades.buyorder2 = 0;
							
	 collection.update({
	},{
                            $set: {
                                'trades': doc3[d].trades
                            }
                        }, {
		
	},
	function(err, result) {
		//////console.log(result.result);
	});
	}
					}
					});
    closed2 = true
  })

  console.log('submitting order %d', o2.cid)

  o2.submit().then(() => {
   console.log('got submit confirmation for order %d [%d]', o2.cid, o2.id)
	var collection = dbo.collection(k);
		collection.find({

                }, {
                    $exists: true
                }).sort({
                    _id: -1

                }).toArray(function(err, doc3) {
                    for (var d in doc3) {
						if (doc3[d].trades){
							doc3[d].trades.buyorder2 = o2.id;
							
	 collection.update({
	},{
                            $set: {
                                'trades': doc3[d].trades
                            }
                        }, {
		
	},
	function(err, result) {
		//////console.log(result.result);
	});
	}
					}
					});
  });
	}
  })

  o.on('close', () => {
	  var collection = dbo.collection(k);
		collection.find({

                }, {
                    $exists: true
                }).sort({
                    _id: -1

                }).toArray(function(err, doc3) {
                    for (var d in doc3) {
						if (doc3[d].trades){
							doc3[d].trades.buyorder1 = 0;
							
	 collection.update({
	},{
                            $set: {
                                'trades': doc3[d].trades
                            }
                        }, {
		
	},
	function(err, result) {
		//////console.log(result.result);
	});
	}
					}
					});
    console.log('order closed: %s', o.status)
    closed = true
  })

  console.log('submitting order %d', o.cid)

  o.submit().then(() => {
    console.log('got submit confirmation for order %d [%d]', o.cid, o.id)
	var collection = dbo.collection(k);
		collection.find({

                }, {
                    $exists: true
                }).sort({
                    _id: -1

                }).toArray(function(err, doc3) {
                    for (var d in doc3) {
						if (doc3[d].trades){
							doc3[d].trades.buyorder1 = o.id;
							
	 collection.update({
	},{
                            $set: {
                                'trades': doc3[d].trades
                            }
                        }, {
		
	},
	function(err, result) {
		//////console.log(result.result);
	});
	}
					}
					});
  });	
    });
	}
	}catch(err){console.log(err);}
	}, Math.random() * 5000);
}
rest.calcAvailableBalance('tEOSUSD', 1, 8, 'MARGIN').then(balances => {
console.log(balances);
});
function sell(k, rate, rate2){ //rate2 for sell is lower
console.log(k);
console.log(rate);
console.log(rate2);
setTimeout(function(){
		try {
	if (!activeOrders.includes(k)){
		  //console.log('sell sell !! ' + k + ' ' + (rate));
	activeOrders.push(k);
	//console.log(activeOrders);
	
rest.calcAvailableBalance(k, 1, rate, 'MARGIN').then(balances => {
	//console.log(balances[0]);
		var amt = balances[0] / 10;
		//console.log(amt);
		for (var v in activeOrders){
			if (v >= 22){
			amt = amt * 1.1;
			}
		}
	console.log(k);
  console.log('sell price: ' + (rate) + ' amount ' + (-1 * amt * (1 / rate)));
  const o = new Order({
    cid: Date.now(),
    symbol: k,
    price: rate,
    amount: -1 * amt *.9995,
    type: Order.type.LIMIT
  }, ws)

  let closed = false

  // Enable automatic updates
  o.registerListeners()
o.on('error', () => {
	console.log('error');
});
  o.on('update', () => {
    console.log('order updated: %j', o.serialize())
	var os = 0;
	if (o.serialize().toString().indexOf('EXECUTED') != -1){
	if (parseFloat(o.serialize()[6]) == 0){
		os = (parseFloat(o.serialize()[7]));
	}else {
		os = parseFloat(o.serialize()[6]);
	}
  console.log('buyl price: ' + (rate * 0.993) + ' amount ' + (-1 * os));
   const o2 = new Order({
    cid: Date.now(),
    symbol: k,
    price: rate2,
    amount: -1 * os,
    type: Order.type.LIMIT
  }, ws)

  let closed2 = false

  // Enable automatic updates
  o2.registerListeners()

o2.on('error', () => {
	console.log('error');
});
  o2.on('update', () => {
    console.log('order updated: %j', o2.serialize())
  })

  o2.on('close', () => {
    console.log('order closed: %s', o2.status)
	var collection = dbo.collection(k);
		collection.find({

                }, {
                    $exists: true
                }).sort({
                    _id: -1

                }).toArray(function(err, doc3) {
                    for (var d in doc3) {
						if (doc3[d].trades){
							doc3[d].trades.sellorder2 = 0;
							
	 collection.update({
	},{
                            $set: {
                                'trades': doc3[d].trades
                            }
                        }, {
		
	},
	function(err, result) {
		//////console.log(result.result);
	});
	}
					}
					});
	activeOrders.splice( k, 1 );
	//console.log(activeOrders);
    closed2 = true
  })

  console.log('submitting order %d', o2.cid)

  o2.submit().then(() => {
   console.log('got submit confirmation for order %d [%d]', o2.cid, o2.id)
	var collection = dbo.collection(k);
		collection.find({

                }, {
                    $exists: true
                }).sort({
                    _id: -1

                }).toArray(function(err, doc3) {
                    for (var d in doc3) {
						if (doc3[d].trades){
							doc3[d].trades.sellorder2 = o2.id;
							
	 collection.update({
	},{
                            $set: {
                                'trades': doc3[d].trades
                            }
                        }, {
		
	},
	function(err, result) {
		//////console.log(result.result);
	});
	}
					}
					});
  });
	}
  })

  o.on('close', () => {
    console.log('order closed: %s', o.status)
    closed = true
	var collection = dbo.collection(k);
		collection.find({

                }, {
                    $exists: true
                }).sort({
                    _id: -1

                }).toArray(function(err, doc3) {
                    for (var d in doc3) {
						if (doc3[d].trades){
							doc3[d].trades.sellorder1 = 0;
							
	 collection.update({
	},{
                            $set: {
                                'trades': doc3[d].trades
                            }
                        }, {
		
	},
	function(err, result) {
		//////console.log(result.result);
	});
	}
					}
					});
  })

  console.log('submitting order %d', o.cid)

  o.submit().then(() => {
    console.log('got submit confirmation for order %d [%d]', o.cid, o.id)
	var collection = dbo.collection(k);
		collection.find({

                }, {
                    $exists: true
                }).sort({
                    _id: -1

                }).toArray(function(err, doc3) {
                    for (var d in doc3) {
						if (doc3[d].trades){
							doc3[d].trades.sellorder1 = o.id;
							
	 collection.update({
	},{
                            $set: {
                                'trades': doc3[d].trades
                            }
                        }, {
		
	},
	function(err, result) {
		//////console.log(result.result);
	});
	}
					}
					});
  });
});
	}
		}catch(err){console.log(err);}
	}, Math.random() * 5000);
}
var usds = []
var ethusd = 0;
var btcusd = 0;
var btcs = []
var prevTS = []
var eths = []

        
					var volTot = 0;
					var volKs= [];
var activeOrders = [ 'tBFTUSD', 'tBFTBTC', 'tELFUSD', 'tZRXUSD', 'tTRXUSD', 'tDADBTC' , 'tDATUSD', 'tZRXUSD', 'tZRXBTC', 'tTRXUSD', 'tTRXBTC', 'tELFUSD', 'tELFBTC','tBFTUSD', 'tBFTBTC',  'tODEUSD', 'tODEBTC', 'tXLMUSD', 'tXLMBTC', 'tDADUSD', 'tDADBTC', 'tWAXUSD', 'tWAXBTC']
var lpa = []
var lpb = []
// 'candles' here is an array

ws.on('error', (err) => {
	if (err.toString().indexOf('recv update') == -1){
  console.log(err)
	}
  if (err.toString().indexOf('EAI_AGAIN') != -1){
  setTimeout(function(){
	  ws.open()
  }, 60000);
  }
})
ws.open()
var mongodb = "";
const express = require('express');
var startDate = new Date('2018/06/29 22:08')
var favicon = require('serve-favicon')
var path = require('path')
 var startBtc = 0.00776254 ; //0.00796575 
var app = express()
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')))
	function sortFunction3(a,b){  
				var dateA = new Date(a.datetime).getTime();
				var dateB = new Date(b.datetime).getTime();
				return dateA < dateB ? 1 : -1;  
			}; 
var dorefresh = false;
var request = require("request")
var bodyParser = require('body-parser')
app.use(bodyParser.json()); // to support JSON-encoded bodies
var sList = []
var gobuy = [];
app.use(bodyParser.urlencoded({ // to support URL-encoded bodies
    extended: true
}));

		var stoplimits = []
		var orders = []
		var count = 0;
function sortFunction2(a,b){  
	var dateA = new Date(a.date).getTime();
	var dateB = new Date(b.date).getTime();
	return dateA < dateB ? 1 : -1;  
}; 
function sortFunction(a,b){  
	var dateA = (a.percent);
	var dateB = (b.percent);
	return dateA > dateB ? 1 : -1;  
}; 
var trades = []
async function doget(req, res){
	try{
		var gosend = true;
		godoks = true;
					var ks = []
	stoplimits = []
		count = 0;
		dbs = []
		collections = []
		var orders2 = []
							 trades = []
		let orders = await bitfinexapi.fetchOpenOrders();
		
		for (var o in orders){
	var string = orders[o].symbol.replace('/', "");
	string = 't' + string;
	if (string.slice(-4) == "USDT"){
		string = string.substr(0, string.length -1 );
	}
			if (!activeOrders.includes(string)){
			activeOrders.push(string);
			}
			
			orders2.push(orders[o]);
		}
			console.log('activeOrders');
			console.log(activeOrders);
	dbo.listCollections().toArray(function(err, collInfos) {
        // collInfos is an array of collection info objects that look like:
        // { name: 'test', options: {} }
        for (col in collInfos) {

            dbs.push(collInfos[col].name);
            collections.push(dbo.collection(collInfos[col].name));
        }
        ////////console.log(dbs);				
		//console.log(tickers);

		for (var c in collections){
			var collection = collections[c];
                collection.find({

                }, {
                    $exists: true
                }).sort({
                    _id: -1

                }).toArray(async function(err, doc3) {
					for (var d in doc3){
						if (!ks.includes(doc3[d].trades.k)){
							ks.push(doc3[d].trades.k);
						}
					//	//////console.log(doc3[d])
						
						////////console.log(doc3[d].trades);
						if (doc3[d].trades){
							
						if (doc3[d].trades.bought1 == false){
							var sl = {'direction': 'buy1', 'pair' : doc3[d].trades.k, 'stoplimit': doc3[d].trades.buy1, 'currentAsk': bestAsk[doc3[d].trades.k], 'percent': (parseFloat(bestAsk[doc3[d].trades.k]) / parseFloat(doc3[d].trades.buy1))}
						if (!activeOrders.includes(doc3[d].trades.k) &&  tickers.includes('trade:1m:' + doc3[d].trades.k)){
						stoplimits.push(sl);
							
						}
						}
						if (doc3[d].trades.bought2 == false){
							if (doc3[d].trades.buy2 != undefined){

							var sl = {'direction': 'buy2', 'pair' : doc3[d].trades.k, 'stoplimit': doc3[d].trades.buy2, 'currentAsk': bestAsk[doc3[d].trades.k], 'percent': (parseFloat(bestAsk[doc3[d].trades.k]) / parseFloat(doc3[d].trades.buy2))}
							
if (!activeOrders.includes(doc3[d].trades.k)&&  tickers.includes('trade:1m:' + doc3[d].trades.k)){
						stoplimits.push(sl);
							
						}								
							}
						} 
						if (doc3[d].trades.sold1 == false){
							var sl = {'direction': 'sell1', 'pair' : doc3[d].trades.k, 'stoplimit': doc3[d].trades.sell1, 'currentBid': bestBid[doc3[d].trades.k], 'percent': (parseFloat(doc3[d].trades.sell1 / parseFloat(bestBid[doc3[d].trades.k])))}
if (!activeOrders.includes(doc3[d].trades.k)&&  tickers.includes('trade:1m:' + doc3[d].trades.k)){
						stoplimits.push(sl);
							
						}							
						}
						if (doc3[d].trades.sold2 == false){
							if (doc3[d].trades.sell2 != undefined){

							var sl = {'direction': 'sell2', 'pair' : doc3[d].trades.k, 'stoplimit': doc3[d].trades.sell2, 'currentBid': bestBid[doc3[d].trades.k], 'percent': (parseFloat(doc3[d].trades.sell2) / parseFloat(bestBid[doc3[d].trades.k]))}
							
if (!activeOrders.includes(doc3[d].trades.k)&&  tickers.includes('trade:1m:' + doc3[d].trades.k)){
						stoplimits.push(sl);
							
						}								
							}
						} 
						}
					}
				});
		}
					setTimeout(function(){
						
		console.log((seventeen * ks.length + 5000));
		console.log('seventeen seventeen');
						
						doks(ks);
						console.log(ks);
					
	setTimeout(async function(){
					
					trades.sort(sortFunction3);
					var totals = []
					totals['USDT'] = []
					totals['BTC'] = []
					totals['ETH'] = []
					
						var cccu = 0;
						var cccb = 0;
						var ccce = 0;
							for (var d in trades){
								if (trades[d].symbol.slice(-4) == "USDT"){
									
							totals['USDT'].push({'pair': trades[d].symbol, 'total': 0});
								} else 
								if (trades[d].symbol.slice(-3) == "BTC"){
									
							totals['BTC'].push({'pair': trades[d].symbol, 'total': 0});
								} else 
								if (trades[d].symbol.slice(-3) == "ETH"){
									
							totals['ETH'].push({'pair': trades[d].symbol, 'total': 0});
								}
							}
							for (var d in trades){
								console.log(trades[d].symbol);
								if (trades[d].symbol.slice(-4) == "USDT"){
									
							if (trades[d].side == 'sell'){
											totals['USDT'][cccu].total += ( parseFloat(trades[d].price) * parseFloat(trades[d].amount ));
											console.log(parseFloat(trades[d].price) * parseFloat(trades[d].amount ));
										}else {
											totals['USDT'][cccu].total = totals['USDT'][cccu].total - (parseFloat(trades[d].price) * parseFloat(trades[d].amount));
										}
								cccu++;
								} else 
								if (trades[d].symbol.slice(-3) == "BTC"){
									if (trades[d].side == 'sell'){
											totals['BTC'][cccb].total += ( parseFloat(trades[d].price) * parseFloat(trades[d].amount ));
											console.log(parseFloat(trades[d].price) * parseFloat(trades[d].amount ));
										}else {
											totals['BTC'][cccb].total = totals['BTC'][cccb].total - (parseFloat(trades[d].price) * parseFloat(trades[d].amount));
										}
								cccb++;
								} else 
								if (trades[d].symbol.slice(-3) == "ETH"){
									if (trades[d].side == 'sell'){
											totals['ETH'][ccce].total += ( parseFloat(trades[d].price) * parseFloat(trades[d].amount ));
											console.log(parseFloat(trades[d].price) * parseFloat(trades[d].amount ));
										}else {
											totals['ETH'][ccce].total = totals['ETH'][ccce].total - (parseFloat(trades[d].price) * parseFloat(trades[d].amount));
										}
								ccce++;
								}
									
									
										
									
							}
							console.log(totals);
						//console.log('1');
							//console.log(balances[0]);
	
							var btcbal = 0;
							//console.log(orders);
							//for (var o in orders){
							//	console.log(o);
							//	console.log(orders[o]);
							//}
								
							var ts = Math.round(new Date().getTime() / 1000) - 1000;
							var tsYesterday = ts - (24 * 3600) - 1000;
								console.log(err);
								var ccc = 0;
							var percent =  (100 * (-1 * (1 - (btcbal / startBtc)))).toFixed(4);
					var diff2 = Math.abs(new Date() - startDate);
					var minutes = Math.floor((diff2/1000)/60);
					var hours = ((diff2/1000)/60 / 60).toFixed(8);
					var percentHr = (percent / hours).toFixed(4);
							////////console.log(balances.BTC);
							trades.sort(sortFunction3);
							stoplimits.sort(sortFunction);
		////////console.log(stoplimits);
		//console.log((totals).toString());
		var thetotalusdt = 0;
		for (var t in totals['USDT']){
			thetotalusdt+= totals['USDT'][t].total;
		}		var thetotaleth = 0;
		for (var t in totals['BTC']){
			thetotaleth+=totals['BTC'][t].total;
		}		var thetotalbtc = 0;
		for (var t in totals['ETH']){
			thetotalbtc+=totals['ETH'][t].total;
		}
		if (gosend == true){
			gosend = false;
		thetotalbtc = thetotalbtc * Math.pow(10, 8);
		thetotaleth = thetotaleth  * Math.pow(10, 18);
		res.send('<head><link rel="icon" href="https://polofibbmonster.herokuapp.com/favicon.ico?v=2" /><meta http-equiv="refresh" content="36"><script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script></head><h1>Don\'t Panic! If the data seems off, wait a minute or so.</h1>'
		+ 'current time: ' + new Date()
		+ '<br>BTC Balance: ' + btcbal + '<br>'
		+ 'minutes: ' + minutes + '<br>'
		+ 'hours: ' + hours + '<br>'
		+ 'percent: ' + percent + '%<br>'
		+ '<h1>percent/hr: ' + percentHr + '%</h1><br>'
		+ '<h1>total gains (usdt): ' + thetotalusdt + '</h1>'
		+ '<h1>total gains (sats): ' + thetotalbtc + '</h1>'
		+ '<h1>total gains (wei): ' + thetotalbtc + '</h1>'
		+ '<div style="display:none;" id="stoplimits">' + JSON.stringify(stoplimits) + '</div>'
		+ '<div style="display:none;" id="orders2">' + JSON.stringify(orders2) + '</div>'
		+ '<div style="display:none;" id="trades">' + JSON.stringify(trades) + '</div>'
		+ '<div style="display:none;" id="totals">' + JSON.stringify(totals) + '</div>'
		+ 'Actual closed totals 24hrs:'
		+ '<div id="showData4"></div><br>stoplimits:'
		+ '<div id="showData"></div><br>open orders: (' + orders2.length + ')'
		+ '<div id="showData2"></div><br>closed orders 24hrs: (max 200) (' + trades.length + ')'
		+ '<div id="showData3"></div>'
		+ '<script>for(var col=[],i=0;i<JSON.parse($("#totals").text()).length;i++)for(var key in JSON.parse($("#totals").text())[i])-1===col.indexOf(key)&&col.push(key);var table6=document.createElement("table");for(tr=table6.insertRow(-1),i=0;i<col.length;i++){var th=document.createElement("th");th.innerHTML=col[i],tr.appendChild(th)}for(i=0;i<JSON.parse($("#totals").text()).length;i++){tr=table6.insertRow(-1);for(var j=0;j<col.length;j++){var tabCell=tr.insertCell(-1);tabCell.innerHTML=JSON.parse($("#totals").text())[i][col[j]]}}var divContainer5=document.getElementById("showData4");divContainer5.innerHTML="",divContainer5.appendChild(table6);for(var col=[],i=0;i<JSON.parse($("#stoplimits").text()).length;i++)for(var key in JSON.parse($("#stoplimits").text())[i])-1===col.indexOf(key)&&col.push(key);var table2=document.createElement("table");for(tr=table2.insertRow(-1),i=0;i<col.length;i++){var th=document.createElement("th");th.innerHTML=col[i],tr.appendChild(th)}for(i=0;i<JSON.parse($("#stoplimits").text()).length;i++){tr=table2.insertRow(-1);for(var j=0;j<col.length;j++){var tabCell=tr.insertCell(-1);tabCell.innerHTML=JSON.parse($("#stoplimits").text())[i][col[j]]}}var divContainer2=document.getElementById("showData");divContainer2.innerHTML="",divContainer2.appendChild(table2);for(var col=[],i=0;i<JSON.parse($("#orders2").text()).length;i++)for(var key in JSON.parse($("#orders2").text())[i])-1===col.indexOf(key)&&col.push(key);var table3=document.createElement("table");for(tr=table3.insertRow(-1),i=0;i<col.length;i++){(th=document.createElement("th")).innerHTML=col[i],tr.appendChild(th)}for(i=0;i<JSON.parse($("#orders2").text()).length;i++){tr=table3.insertRow(-1);for(var j=0;j<col.length;j++){(tabCell=tr.insertCell(-1)).innerHTML=JSON.parse($("#orders2").text())[i][col[j]]}}var divContainer3=document.getElementById("showData2");divContainer3.innerHTML="",divContainer3.appendChild(table3);for(col=[],i=0;i<JSON.parse($("#trades").text()).length;i++)for(var key in JSON.parse($("#trades").text())[i])-1===col.indexOf(key)&&col.push(key);var table4=document.createElement("table");for(tr=table4.insertRow(-1),i=0;i<col.length;i++){var th;(th=document.createElement("th")).innerHTML=col[i],tr.appendChild(th)}for(i=0;i<JSON.parse($("#trades").text()).length;i++){tr=table4.insertRow(-1);for(j=0;j<col.length;j++){var tabCell;(tabCell=tr.insertCell(-1)).innerHTML=JSON.parse($("#trades").text())[i][col[j]]}}var divContainer4=document.getElementById("showData3");divContainer4.innerHTML="",divContainer4.appendChild(table4);</script>');
							
							}
					
	},(seventeen * 8  * ks.length + 1000));
					}, 4000);
					
	});
	}catch(err){
		res.send('err: ' + err);
	}
}
var seventeen = 555;
var godoks = true;
function doks(ks){
	if (godoks == true){
	godoks = false;
	setTimeout(function(){
	dodoget(ks, 0, ks.length);
	console.log(ks.length);
	}, seventeen);
}
}
async function dodoget(ks, i, length){
	console.log('length ' + length);
	console.log(ks[i]);
	var string = ks[i].replace(/(?=.{3}$)/,'/');
	string = string.substr(1, string.length);
	console.log(string);
	try {
		if (string.slice(-3) == "USD"){
		string += "T";	
		}
		if (string.substr(0, 3) == "DSH"){
		string = string.substr(3, string.length);
string = "DASH" + string;		
		}
		
		if (string.substr(0, 3) == "IOT"){
		string = string.substr(3, string.length);
string = "IOTA" + string;		
		}
		console.log(string);
	let trades2 = await bitfinexapi.fetchMyTrades(string);
	for (var o in trades2){
		//console.log(trades2[o])
		trades.push(trades2[o]);
	}
		if ((i + 1) < ks.length - 1){
			console.log('dodoagain');
	setTimeout(async function(){
		dodoget(ks, i + 1, ks.length);
	}, seventeen * 4);
		}
	}catch(err){console.log(err);
	if (err.toString().indexOf('Rate') != -1){
	setTimeout(async function(){
		dodoget(ks, i, ks.length);
	}, seventeen * 22);
	
	}else{
		setTimeout(async function(){
		dodoget(ks, i + 1, ks.length);
	}, seventeen * 4);
	}
	}
}
app.get('/', function(req, res) {
	try {
		doget(req, res);
	} catch (err){
		console.log(err);
		setTimeout(function(){
		doget(req, res);
		}, 20000);
	}
});

            app.listen(process.env.PORT || 8080, function() {});
						//console.log('2');
//poloniex.subscribe('BTC_ETC');
 var vols = [];
	var winnas = []
 var doVols = false;
 var pairs = [];
 var basePairs = [];

	function updateStoplimits(wp, collection){
		

		collection.find({

                }, {
                    $exists: true
                }).sort({
                    _id: -1

                }).toArray(function(err, doc3) {
                    for (var d in doc3) {
						if (doc3[d].trades){
							doc3[d].trades.buy1 = wp.buy1;
							doc3[d].trades.buy2 = wp.buy2;
							doc3[d].trades.sell1 = wp.sell1;
							doc3[d].trades.sell2 = wp.sell2;
							
	 collection.update({
	},{
                            $set: {
                                'trades': doc3[d].trades
                            }
                        }, {
		
	},
	function(err, result) {
		//////console.log(result.result);
	});
	}
					}
					});
				}
 
 function insert(wp, collection){
	console.log(wp);
	 console.log('insert');
	
			
			collection.insertOne({
				'trades': wp
			}, function(err, res) {
				if (err) console.log(err);
				
			if (wp.currencyPair == "BTC_BCH"){
				//////console.log(wp);
			}
			  ////console.log(res.result);
			}); 
 }
 
 var btceth = 0;
 var btcxmr = 0;
 var btcUSD = 0;
 var msgcount = 0;
var dbs = []
var collections = []
setTimeout(function(){
MongoClient.connect(process.env.mongodb || mongodb, function(err, db) {
	console.log(err);
    var dbo = db.db('polomonster138-jare11332')
	var count = 0;
    dbo.listCollections().toArray(function(err, collInfos) {
        // collInfos is an array of collection info objects that look like:
        // { name: 'test', options: {} }
        for (col in collInfos) {

            dbs.push(collInfos[col].name);
            collections.push(dbo.collection(collInfos[col].name));
        }
        ////////console.log(dbs);
						//////////console.log('settimeout');
						doCollections(collections);
                setInterval(function() {
                    doCollections(collections);
                }, 15500);
    });
});
}, 10000);

function doCollections(collections, balances){
							
							
						////console.log('8'); 
			
    
			
            ////////console.log(balances.BTC);
			
			var count = 0;
							
            for (var c in collections) {
                var collection = collections[c];
                collectionDo(collection);



							}
        
}
var godobuy = true;
var godosell = true;

async function collectionDo(collection){
							var ds = []

	collection.find({

                }, {
                    $exists: true
                }).sort({
                    _id: -1

                }).toArray(function(err, doc3) {

                    for (var d in doc3) {
						if (doc3[d].trades){
							 var d3d = doc3[d];
					var ts = Math.round(new Date().getTime() / 1000) - 1000;
					var tsHour = ts - (30 * 60) - 1000;
					////console.log(tsHour);
					
					/*
					const o = new CancelOrder({
						order: 
					  }, ws)

					  let closed = false

					  // Enable automatic updates
					  o.registerListeners()
					o.on('error', () => {
						console.log('error');
					});
					  o.on('update', () => {
						console.log('order updated: %j', o.serialize())
						
					  })

					  o.on('close', () => {
						console.log('order closed: %s', o.status)
						closed = true
					  })

					  console.log('submitting order %d', o.cid)

					  o.submit().then(() => {
						console.log('got submit confirmation for order %d [%d]', o.cid, o.id)
					  });
					/*
						for (var d in data){
								if (data[d].length > 0){
									for (var a in data[d]){
										data[d][a].pair = d;
										////console.log(data[d][a].type);
										if (data[d][a].type == "buy"){
										data[d][a].currentBid = bestBid[data[d][a].pair];
										var date = new Date(data[d][a].date).getTime() / 1000;
											////console.log(date); 
										var date2 = startDate.getTime() / 1000;
										if (date <= tsHour && date >= date2){
											//console.log(parseFloat(data[d][a].orderNumber));
											//console.log('cancel cancel!');
											
											
											poloniex.cancelOrder(parseFloat(data[d][a].orderNumber), function(data){
												//console.log('cancelled');
											});
											
											
										}
										
										}
									}
								}
							}*/
	  /* come back to this
							poloniex.returnBalances(function(err, balances) {
						
							var btc = parseFloat(balances.BTC) / 16;
							if (btc < 0.0001){
								btc = 0.0001;
							}
							if (balances[d3d.trades.currencyPair.substr(d3d.trades.currencyPair.indexOf('_') +1, d3d.trades.currencyPair.length)] != 0){
								if (balances[d3d.trades.currencyPair.substr(d3d.trades.currencyPair.indexOf('_') +1, d3d.trades.currencyPair.length)]  * bestAsk[d3d.trades.currencyPair] > 0.0001){
								poloniex.sell(d3d.trades.currencyPair, parseFloat(d3d.trades.sell1).toFixed(8), (balances[d3d.trades.currencyPair.substr(d3d.trades.currencyPair.indexOf('_') +1, d3d.trades.currencyPair.length)] * .998).toFixed(8), 0, 0, 0 , function (err, data3){
									//console.log(data3);
									console.log(err);

								});
								}
							}
							*/
							//console.log(d3d.trades.currencyPair);
							////console.log('ds: ');
							////console.log(ds);
							if (d3d.trades.currencyPair){
								if (d3d.trades.buy2){
								if (d3d.trades.bought1 == true && d3d.trades.bought2 == true && ((d3d.trades.buyorder1 == 0) &&((d3d.trades.buyorder2 == 0)))){
									if (d3d.trades.bought1 == true){
									//console.log('bought1 and bought2 true');
								}
									d3d.trades.bought1 = false;
									d3d.trades.bought2 = false;
									d3d.trades.buyorder1 = 0;
									d3d.trades.buyorder2 = 0;
									collection.update({
									}, {
										$set: {
											"trades": d3d.trades
										}
									}, { multi: true },
									function(err, result) {
									   console.log(err);
										////console.log(result.result);
									godobuy = true;
															

									});
								}
								} 
								
								if (d3d.trades.sold1 == true && d3d.trades.sold2 == true && ((d3d.trades.buyorder1 == 0 ) &&((d3d.trades.buyorder2 == 0 )))){
									if (d3d.trades.sold1 == true){
									//console.log('sold1 and sold2 true');
								}
								}
									d3d.trades.sold1 = false;
									d3d.trades.sold2 = false;
									collection.update({
									}, {
										$set: {
											"trades": d3d.trades
										}
									}, { multi: true },
									function(err, result) {
									   console.log(err);
										////console.log(result.result);
									godobuy = true;
															

									});
								}
								}
							
						if (d3d.trades.bought1 == false){
							
                        if (parseFloat(bestAsk[d3d.trades.k]) <= d3d.trades.buy1 && parseFloat(bestAsk[d3d.trades.k]) > 0.00000200)	 {
                            ////////console.log(d3d.trades.last);
							////////console.log(d3d.trades);
							d3d.trades.bought1 = true;
							if (godobuy == true){
								godobuy = false;

							//console.log('dobuy:');
							//console.log(d3d);
							collection.update({
								}, {
									$set: {
										"trades": d3d.trades
									}
								}, { multi: true },
								function(err, result) {
								   console.log(err);
									////console.log(result.result);
								godobuy = true;
														

								});
							buy(d3d.trades.k, d3d.trades.buy1, d3d.trades.sell1);
							}
                        }
						}
                        if (d3d.trades.buy2) {
                            if (parseFloat(bestAsk[d3d.trades.k])<= d3d.trades.buy2 && d3d.trades.bought2 == false && parseFloat(bestAsk[d3d.trades.k]) > 0.00000200) {
							////////console.log(d3d.trades.last);
							////////console.log(d3d.trades);
							d3d.trades.bought2 = true;
														if (godobuy == true){
godobuy = false;
								collection.update({
								}, {
									$set: {
										"trades": d3d.trades
									}
								}, { multi: true },
								function(err, result) {
								   console.log(err);
									////console.log(result.result);
								godobuy = true;
														

								});
							//console.log('dobuy2:');
							buy(d3d.trades.k, d3d.trades.buy2, d3d.trades.buy1);
                            }
							}
                        }
						if (d3d.trades.k == 'tSNTUSD'){
						console.log(d3d.trades.k);
						console.log(d3d.trades.sold1);
						console.log(parseFloat(bestBid[d3d.trades.k]))
						console.log(d3d.trades.sell1);
						}
						if (d3d.trades.sold1 == false){
                        if (parseFloat(bestBid[d3d.trades.k]) >= d3d.trades.sell1 && parseFloat(bestAsk[d3d.trades.k]) > 0.00000200) {
                            ////////console.log(d3d.trades.last);
							////////console.log(d3d.trades);
							d3d.trades.sold1 = true;
							if (godosell == true){
								godosell = false;

							console.log('dosell');
							console.log(d3d);
							collection.update({
								}, {
									$set: {
										"trades": d3d.trades
									}
								}, { multi: true },
								function(err, result) {
								   console.log(err);
									////console.log(result.result);
								godosell = true;
														

								});
							sell(d3d.trades.k, d3d.trades.sell1, d3d.trades.buy1);
							}
                        }
						}
                        if (d3d.trades.sell2) {
                            if (parseFloat(bestBid[d3d.trades.k]) >= d3d.trades.sell2 && d3d.trades.sold2 == false && parseFloat(bestAsk[d3d.trades.k]) > 0.00000200 ){
							////////console.log(d3d.trades.last);
							////////console.log(d3d.trades);
							d3d.trades.sold2 = true;
														if (godosell == true){
godosell = false;
								collection.update({
								}, {
									$set: {
										"trades": d3d.trades
									}
								}, { multi: true },
								function(err, result) {
								   console.log(err);
									////console.log(result.result);
								godosell = true;
														

								});
							//console.log('dosell:');
							sell(d3d.trades.k, d3d.trades.sell2, d3d.trades.sell1);
                            }
							}
                        }
						}
						})
					}
					
					
   
var dbo;
				MongoClient.connect(process.env.mongodb || mongodb, function(err, db) {
					console.log(err);
				dbo = db.db('polomonster138-jare11332')
				//////console.log('dbo');
				
				});
