const Poloniex = require('poloniex-api-node');
const tw = require('./trendyways.js');
var MongoClient = require('mongodb').MongoClient;
let poloniex
				var bestAsk = []

				const ccxt = require ('ccxt');
				

				var bestBid = []
				const bfx = require('./bfx.js')
let bitfinexapi = new ccxt.ethfinex ({
		apiKey: process.env.bapi2,
	secret: process.env.bkey2,
	})

const ws = bfx.ws(2, {
	apiKey:process.env.bapi, apiSecret: process.env.bkey,
  manageCandles: true, // enable candle dataset persistence/management
  transform: true // 
  })
const { Order } = require('./node_modules/bitfinex-api-node/lib/models')

const { MarginInfo } = require('./node_modules/bitfinex-api-node/lib/models')
const { CancelOrder }  = require('./node_modules/bitfinex-api-node/lib/models')
var startDate = new Date();
const CANDLE_KEY = 'trade:1m:tBTCUSD'
console.log('bapi: ' + process.env.bapi);
var btcusd = parseFloat(process.env.btcusd);
const rest = bfx.rest(2, {
apiKey: process.env.bapi, apiSecret: process.env.bkey});
var keys = []
var keys2 = []
ws.on('open', () => {
  ws.auth()
	console.log('open')
	rest.calcAvailableBalance('tBTCUSD', 1, 0.090072, 'MARGIN').then(balances => {
	////console.log(balances[0]);
	})
	rest.symbols().then(symbols => {
		for (var s in symbols) {
			//console.log('t' + symbols[s].toUpperCase());
			if ( symbols[s].toUpperCase().slice(-3) == "ETH" ||  symbols[s].toUpperCase().slice(-3) == "BTC" ||  symbols[s].toUpperCase().slice(-3) == "USD"){
			keys.push('trade:1m:t' + symbols[s].toUpperCase());
			keys2.push('t' + symbols[s].toUpperCase());
			subs('t' + symbols[s].toUpperCase(), symbols.length);
			
			
	
			}
		}
		ws.subscribeTicker("tETHUSD");
		tickerticker("tETHUSD");
		for (var k in keys) {
			//console.log(keys2[k]);	
		ws.subscribeTicker(keys2[k]);
			tickerticker(keys2[k]);
			
		}
		for (var k in keys) {
			
			//////console.log(keys[k]);
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
		//////////console.log(dbs);
		for (var c in collections){
			var collection = collections[c];
				collection.find({

				}, {
					$exists: true
				}).sort({
					_id: -1

				}).toArray(function(err, doc3) {
		//////////console.log(dbs);
		ws.subscribeTicker("tETHUSD");
		tickerticker("tETHUSD");
		for (var d in doc3){
			if (!ks.includes(doc3[d].trades.k)){
							ks.push(doc3[d].trades.k);
						}
						if (doc3[d].trades.k == 'tZCNETH'){
							//console.log('tZCNETH');
						}
					subs(doc3[d].trades.k, 0);
					}
					doks();
				});
		}
		});
	
	}, 2000);
	}).catch(err => {
		
	})
})

function subs(ss, count){
	if ((activeOrders[ss] <= 1) && count <= 3){
	setTimeout(function(){
		
			ws.subscribeTicker( ss) //'trade:1m:' + 
			tickerticker(ss);
			//subs(ss, count + 1);
}, Math.random() * 2000 * 40); 
	}
}
var tickers = []
	var winners = {};
	var winnas = []
	var tickercount = []
function tickerticker(k){
	
ws.onTicker({ symbol: k }, (ticker) => {
	//console.log(ticker)

	if (tickercount[k] == undefined){
		tickercount[k] = 0;
	}
	tickercount[k]++;
	if (k == 'tBTCUSD'){
		//console.log(tickercount[k]);
	}
	if (btceth != 0 && ethusd != 0){
		
	if (k.slice(-3)== "USD"){
						var amt = ethusd;
						//console.log(amt);
					if (!volKs.includes(k) && ((ticker.volume * ticker.ask) / amt)){						
					volKs.push(k);
						volTot += (ticker.volume * ticker.ask) / amt;
					}
					}
					else if (k.slice(-3)== "ETH"){
						var amt = 1;
						//console.log(amt);
					if (!volKs.includes(k) && ((ticker.volume * ticker.ask) / amt)){						
					//console.log(k)
					volKs.push(k);
						volTot += (ticker.volume * ticker.ask) / amt;
					}
					}
					else if (k.slice(-3)== "BTC"){
						var amt = btceth * ethusd;
						//console.log(amt);
					if (!volKs.includes(k) && ((ticker.volume * ticker.ask) / amt)){						

					volKs.push(k);
						volTot += (ticker.volume * ticker.ask) / amt;
					}
					}
					//console.log(volTot);
					
					var avg = volTot / volKs.length;
					//console.log(avg);
					if ((ticker.volume * ticker.ask) / amt > (avg / 20)){
						
						if (!tickers.includes('trade:1m:' + k)){
							//console.log(k);
						tickers.push('trade:1m:' + k)
						}
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
								
								//console.log(winners[k]);
								winners[k].cancelled = false;
								collection.find({

								}, {
								}).sort({
									_id: -1

								}).toArray(function(err, doc3) {
									//console.log(doc3);
									if (doc3.length == 0){
									if (!winnas.includes(k)){
										winnas.push(k);
															
									
							insert(winners[k], collection);
									}
									}
									});
									if (tickercount[k] >= 75){
									updateStoplimits(winners[k], collection);
									tickercount[k]=0;
								}
								
							}
								
					}
	} else {
		if (k == "tETHBTC"){
			console.log(ticker);
			btceth = ticker.ask;
		}
		else if (k == "tETHUSD"){
			ethusd = ticker.ask;
		}
	}
});
}
var cancelOrders = []
async function oo(){
	activeOrders = []
	 activeOrders['tFUNUSD'] = 3
	 activeOrders['tFUNBTC'] = 3
	 activeOrders['tBFTUSD'] = 3
	 activeOrders['tBFTBTC'] = 3
	 activeOrders['tELFUSD'] = 3
	 activeOrders['tZRXUSD'] = 3
	 activeOrders['tTRXUSD'] = 3
	 activeOrders['tDADBTC'] = 3
	 activeOrders['tDATUSD'] = 3
	 activeOrders['tZRXUSD'] = 3
	 activeOrders['tZRXBTC'] = 3
	 activeOrders['tTRXUSD'] = 3
	 activeOrders['tTRXBTC'] = 3
	 activeOrders['tELFUSD'] = 3
	 activeOrders['tELFBTC'] = 3
	 activeOrders['tBFTUSD'] = 3
	 activeOrders['tBFTBTC'] = 3
	 activeOrders['tODEUSD'] = 3
	 activeOrders['tODEBTC'] = 3
	 activeOrders['tXLMUSD'] = 3
	 activeOrders['tXLMBTC'] = 3
	 activeOrders['tDADUSD'] = 3
	 activeOrders['tDADBTC'] = 3
	 activeOrders['tWAXUSD'] = 3
	 activeOrders['tWAXBTC'] = 3
	let positions = await rest.positions()
	for (let i = 0; i < positions.length; i += 1) {
		var p = positions[i];
		var string = p[0];
		if (p[2] <= 0){
			console.log(string);
			console.log('sell ' + p[3] / bestAsk[string]);
			if (p[3] / bestAsk[string] < 0.94){
			cancelOrders.push(string);
   const o2 = new Order({
	cid: Date.now(),
	symbol: string,
	amount: (-1 * p[2]),
	type: Order.type.MARKET
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
	activeOrders[string] = activeOrders[string] - 1
	////console.log(activeOrders);
var collection = dbo.collection(string);
		collection.find({

				}, {
					$exists: true
				}).sort({
					_id: -1

				}).toArray(function(err, doc3) {
					for (var d in doc3) {
						if (doc3[d].trades){
							doc3[d].trades.buyorder2 = 0;
							doc3[d].trades.bought2 = false;
							
	 collection.update({
	},{
							$set: {
								'trades': doc3[d].trades
							}
						}, {
		
	},
	function(err, result) {
		////////console.log(result.result);
	});
	}
					}
					});
	closed2 = true
  })

  console.log('submitting order %d', o2.cid)

  o2.submit().then(() => {
   console.log('got submit confirmation for order %d [%d]', o2.cid, o2.id)
	var collection = dbo.collection(string);
		collection.find({

				}, {
					$exists: true
				}).sort({
					_id: -1

				}).toArray(function(err, doc3) {
					for (var d in doc3) {
						if (doc3[d].trades){
							doc3[d].trades.buyorder2 = 0;
							doc3[d].trades.buyorder1 = 0;
							doc3[d].trades.sellorder1 = 0;
							doc3[d].trades.sellorder2 = 0;
							
	 collection.update({
	},{
							$set: {
								'trades': doc3[d].trades
							}
						}, {
		
	},
	function(err, result) {
		////////console.log(result.result);
	});
			}
					}
				});
  });
		}else{			

			console.log(string);
			console.log('buy ' + bestBid[string] / p[3]);
			if (bestBid[string] / p[3] < 0.94){
		cancelOrders.push(string);
				
   const o2 = new Order({
	cid: Date.now(),
	symbol: string,
	amount: (-1 * p[2]),
	type: Order.type.MARKET
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
	activeOrders[string] = activeOrders[string] - 1
	////console.log(activeOrders);
var collection = dbo.collection(string);
		collection.find({

				}, {
					$exists: true
				}).sort({
					_id: -1

				}).toArray(function(err, doc3) {
					for (var d in doc3) {
						if (doc3[d].trades){
							doc3[d].trades.buyorder2 = 0;
							doc3[d].trades.bought2 = false;
							
	 collection.update({
	},{
							$set: {
								'trades': doc3[d].trades
							}
						}, {
		
	},
	function(err, result) {
		////////console.log(result.result);
	});
						
	}
					}
					});
	closed2 = true
  })

  console.log('submitting order %d', o2.cid)

  o2.submit().then(() => {
   console.log('got submit confirmation for order %d [%d]', o2.cid, o2.id)
	var collection = dbo.collection(string);
		collection.find({

				}, {
					$exists: true
				}).sort({
					_id: -1

				}).toArray(function(err, doc3) {
					for (var d in doc3) {
						if (doc3[d].trades){
							doc3[d].trades.buyorder2 = 0;
							doc3[d].trades.buyorder1 = 0;
							doc3[d].trades.sellorder1 = 0;
							doc3[d].trades.sellorder2 = 0;
							
	 collection.update({
	},{
							$set: {
								'trades': doc3[d].trades
							}
						}, {
		
	},
	function(err, result) {
		////////console.log(result.result);
	});}
					}
				});
  });
			}
		}
				}
	}
/*
		const data = [
		  p.symbol, p.status, p.amount, p.basePrice, p.marginFunding,
		  Number(p.marginFunding) + (Number(p.amount) * Number(p.basePrice))
		]

		if (PL_ENABLED) {
		  const nv = Number(lastPrices[p.symbol]) * Number(p.amount)
		  const pl = nv - (p.basePrice * p.amount)
		  const plPerc = (pl / nv) * 100.0

		  data.push(nv)
		  data.push(pl)
		  data.push(plPerc)
		}

		t.push(data)*/
	

	let orders = await bitfinexapi.fetchOpenOrders();
		
		for (var o2 in orders){
			//console.log(orders[o]);
	var string = orders[o2].symbol.replace('/', "");
	if (string.slice(-4) == "USDT"){
		string = string.substr(0, string.length -1 );
	}if (string.startsWith("DASH")){
		string = string.substr(4, string.length );
		string = "DSH" + string;
	}if (string.startsWith("IOTA")){
		string = string.substr(4, string.length );
		string = "IOT" + string;
		}
	string = 't' + string;
	if (cancelOrders.includes(string)){
		const o = bitfinexapi.cancelOrder(orders[o2].id)

	}
	else {
		console.log(string);
		if (activeOrders[string] == undefined){
					activeOrders[string] = 0;
				}
			if (activeOrders[string] <= 1){
				if (activeOrders[string] == undefined){
					activeOrders[string] = 0;
				}
			activeOrders[string] += 1;

		}
		//console.log('activeorders');
		//console.log(activeOrders);
	}
}
}
ws.once('auth', () => {
	setTimeout(function(){
	oo();
	}, 10000);
	setInterval(function(){
		oo();
	}, 60000);
////console.log('auth');
});
function buy(k, rate, rate2){ //rate2 for buy is higher
	setTimeout(function(){
		try{
			if (activeOrders[k] == undefined){
					activeOrders[k] = 0;
				}
			if (activeOrders[k] <= 1){
				if (activeOrders[k] == undefined){
					activeOrders[k] = 0;
				}
		  console.log('buy buy !! ' + k + ' ' + (rate));
			activeOrders[k] += 1;
	////console.log(activeOrders);
	
	rest.calcAvailableBalance(k, 1, rate, 'MARGIN').then(balances => {
	////console.log(balances[0]);
		var amt = balances[0] / parseFloat(divisor);
		////console.log(amt);
		/*lala = 0;
		for (var v in activeOrders){
			lala++;
			if (lala >= 20){
			amt = amt * 1.1;
			}
		}
		console.log('lala ' + lala);
	*/
		////console.log(amt);
			console.log('buyl price: ' + ((rate2)) + ' amount ' + amt);

  const o = new Order({
	cid: Date.now(),
	symbol: k,
	price: rate2,
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
	  								godobuy = true;

	console.log('order updated: %j', o.serialize())
	var os = 0;
	os = o.serialize()[7]
	if (o.serialize().toString().indexOf('EXECUTED') != -1 && o.serialize().toString().indexOf('PARTIALLY') == -1){
		//console.log(k);
		const sgMail = require('@sendgrid/mail');

		sgMail.setApiKey(process.env.SENDGRID_API_KEY);
		const msg = {
		to: process.env.email,
		from: process.env.email,
		subject: 'New Trade!',
		text: o.serialize().toString(),
		html: o.serialize().toString()
		};
		sgMail.send(msg);
   console.log('sell price: ' + ((rate)) + ' amount ' + ((-1 * ( os / 2 ))));
	var ran = ((Math.random() * 3) + 1)
  console.log('sell price: ' + ((rate * 0.009 * ran)) + ' amount ' + ((-1 * ( os / 2 ))));
   const o3 = new Order({
	cid: Date.now(),
	symbol: k,
	price_trailing: (rate * 0.009 * ran),
	price: (rate * 0.009 * ran),
	amount: (-1 * ( os / 2 )),
	type: Order.type['TRAILING STOP']
  }, ws)

  let closed3 = false

  // Enable automatic updates
  o3.registerListeners()

o3.on('error', () => {
	console.log('error');
});
  o3.on('update', () => {
	console.log('order updated: %j', o3.serialize())
  })

  o3.on('close', () => {
	  
	console.log('order closed: %s', o3.status)
	////console.log(activeOrders);
					
	closed3 = true
	})

  console.log('submitting order %d', o3.cid)

  o3.submit().then(() => {
		 console.log('got submit confirmation for order %d [%d]', o3.cid, o3.id)

  });
   const o2 = new Order({
	cid: Date.now(),
	symbol: k,
	price: (rate),
	amount: (-1 * ( os / 2 )),
	type: Order.type.LIMIT,
	priceAuxLimit: rate2 * 1.07
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
	activeOrders[k] = activeOrders[k] - 1
	////console.log(activeOrders);
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
							doc3[d].trades.bought2 = false;
							
	 collection.update({
	},{
							$set: {
								'trades': doc3[d].trades
							}
						}, {
		
	},
	function(err, result) {
		////////console.log(result.result);
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
		////////console.log(result.result);
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
							doc3[d].trades.bought1 = false;
							
	 collection.update({
	},{
							$set: {
								'trades': doc3[d].trades
							}
						}, {
		
	},
	function(err, result) {
		////////console.log(result.result);
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
		////////console.log(result.result);
	});
	}
					}
					});
  });	
	});
	}
	}catch(err){}
	}, Math.random() * 5000);
}
function sell(k, rate, rate2){ //rate2 for sell is lower
//console.log(k);
//console.log(rate);
//console.log(rate2);
		var lala = 0;
		var lala2 = 0;
		
setTimeout(function(){
		try {if (activeOrders[k] == undefined){
					activeOrders[k] = 0;
				}
			if (activeOrders[k] <= 1){
				if (activeOrders[k] == undefined){
					activeOrders[k] = 0;
				}
		  console.log('	! ' + k + ' ' + (rate) + ' ' + rate2);
			activeOrders[k] += 1;
	////console.log(activeOrders);
	
rest.calcAvailableBalance(k, 1, rate, 'MARGIN').then(balances => {
	////console.log(balances[0]);
		var amt = balances[0] / parseFloat(divisor);
		////console.log(amt);
		/*
		lala2 = 0;
		for (var v in activeOrders){
			lala2++;
			if (lala2 >= 20){
			amt = amt * 1.1;
			}
		}*/
		console.log('lala ' + lala2);
	//console.log(k);
  console.log('sell price: ' + (rate) + ' amount ' + (-1 * amt * (1 / rate)));
  const o = new Order({
	cid: Date.now(),
	symbol: k,
	price: rate,
	amount: -1 * amt,
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
									godosell = true;

	var os2 = 0;
	if (o.serialize().toString().indexOf('EXECUTED') != -1 && o.serialize().toString().indexOf('PARTIALLY') == -1){
		const sgMail = require('@sendgrid/mail');

		sgMail.setApiKey(process.env.SENDGRID_API_KEY);
		const msg = {
		to: process.env.email,
		from: process.env.email,
		subject: 'New Trade!',
		text: o.serialize().toString(),
		html: o.serialize().toString()
		};
		sgMail.send(msg);
	os2 = o.serialize()[7]
	var ran = ((Math.random() * 3) + 1)
  console.log('buyl price: ' + (rate2 * 0.009 * ran) + ' amount ' + ((-1 * ( os2 / 2 ))));
   const o3 = new Order({
	cid: Date.now(),
	symbol: k,
	price_trailing: (rate2 * 0.009 * ran),
	price: (rate2 * 0.009 * ran),
	amount: (-1 * ( os2 / 2 )),
	type: Order.type['TRAILING STOP']
  }, ws)

  let closed3 = false

  // Enable automatic updates
  o3.registerListeners()

o3.on('error', () => {
	console.log('error');
});
  o3.on('update', () => {
	console.log('order updated: %j', o3.serialize())
  })

  o3.on('close', () => {
	  
	console.log('order closed: %s', o3.status)
	////console.log(activeOrders);
					
	closed3 = true
	})

  console.log('submitting order %d', o3.cid)

  o3.submit().then(() => {
		 console.log('got submit confirmation for order %d [%d]', o3.cid, o3.id)

  });
  console.log('buyl price: ' + (rate2) + ' amount ' + ((-1 * ( os2 / 2 ))));
   const o2 = new Order({
	cid: Date.now(),
	symbol: k,
	price: rate2,
	amount: (-1 * ( os2 / 2 )),
	type: Order.type.LIMIT,
	priceAuxLimit: rate * .98

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
							doc3[d].trades.sold2 = false;
							
	 collection.update({
	},{
							$set: {
								'trades': doc3[d].trades
							}
						}, {
		
	},
	function(err, result) {
		////////console.log(result.result);
	});
	}
					}
					});
	activeOrders[k] = activeOrders[k] - 1
	////console.log(activeOrders);
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
		////////console.log(result.result);
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
							doc3[d].trades.sold1 = false;
							doc3[d].trades.sellorder1 = 0;
							
	 collection.update({
	},{
							$set: {
								'trades': doc3[d].trades
							}
						}, {
		
	},
	function(err, result) {
		////////console.log(result.result);
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
		////////console.log(result.result);
	});
	}
					}
					});
  });
});
	}
		}catch(err){}
	}, Math.random() * 5000);
}
var usds = []
var ethusd = 0;
var btceth = 0;
var btcs = []
var prevTS = []
var eths = []

		
					var volTot = 0;
					var volKs= [];
	var activeOrders = []
activeOrders['tBFTUSD'] = 3
	 activeOrders['tBFTBTC'] = 3
	 activeOrders['tELFUSD'] = 3
	 activeOrders['tZRXUSD'] = 3
	 activeOrders['tTRXUSD'] = 3
	 activeOrders['tDADBTC'] = 3
	 activeOrders['tDATUSD'] = 3
	 activeOrders['tZRXUSD'] = 3
	 activeOrders['tZRXBTC'] = 3
	 activeOrders['tTRXUSD'] = 3
	 activeOrders['tTRXBTC'] = 3
	 activeOrders['tELFUSD'] = 3
	 activeOrders['tELFBTC'] = 3
	 activeOrders['tBFTUSD'] = 3
	 activeOrders['tBFTBTC'] = 3
	 activeOrders['tODEUSD'] = 3
	 activeOrders['tODEBTC'] = 3
	 activeOrders['tXLMUSD'] = 3
	 activeOrders['tXLMBTC'] = 3
	 activeOrders['tDADUSD'] = 3
	 activeOrders['tDADBTC'] = 3
	 activeOrders['tWAXUSD'] = 3
	 activeOrders['tWAXBTC'] = 3
	 activeOrders['tFUNUSD'] = 3
	 activeOrders['tFUNBTC'] = 3
var lpa = []
var lpb = []
// 'candles' here is an array

ws.on('error', (err) => {
	if (err.toString().indexOf('recv update') == -1){
  //console.log(err)
	}
	console.log(err);
  if (err.toString().indexOf('EAI_AGAIN') != -1){
  setTimeout(function(){
	  ws.open()
  }, 60000);
  }
})
setInterval(function(){
	ws.open();
}, 45000);
ws.open()
var mongodb = "";
const express = require('express');
var startDate = new Date()
var favicon = require('serve-favicon')
var path = require('path')
 var startBtc = 0.00360557 ; //0.00796575 
 var startBch = 0.06579248;
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
var maxclosed = 0;
function sortFunction(a,b){  
	var dateA = (a.percent);
	var dateB = (b.percent);
	return dateA > dateB ? 1 : -1;  
}; 

		godosell = false;
		godobuy = false;
		var mnstart =  132.50258064;
async function setBal(){
	var mi = await rest.marginInfo()
	console.log(ethusd);
	rest.calcAvailableBalance('tETHUSD', 1, ethusd, 'MARGIN').then(balances => {
	var btcusdavail = (balances[0] * ethusd);
	console.log(btcusdavail);
	divisor = btcusdavail / 50
	console.log('divisor: ' + divisor);
	if (divisor <= .8){
		godosell = false;
		godobuy = false;
		console.log('NONO buy buy! NONO sell sell!');
	}
	else {
		godosell = true;
		godobuy = true;
		console.log('buy buy! sell sell!');
	}
	});
	console.log(mi);
	
	var MN = mi[1][2]
	
	PL = -1 * (1-(MN /parseFloat(process.env.mnstart))) * 100;
	console.log('PL: ' + PL);
}
setTimeout(function(){
setBal();
}, 800);
setInterval(function(){
	setBal();
}, 120000);
var trades = []
var divisor = 1
var PL = 1
						var totals = []
					var ks = []
async function doget(req, res){
	try{
		var gosend = true;
		godoks = true;
	stoplimits = []
		count = 0;
		dbs = []
		collections = []
		var orders2 = []
		let orders = await bitfinexapi.fetchOpenOrders();
		
		for (var o in orders){
	var string = orders[o].symbol.replace('/', "");
	string = 't' + string;
	if (string.slice(-4) == "USDT"){
		string = string.substr(0, string.length -1 );
	}if (activeOrders[string] == undefined){
					activeOrders[string] = 0;
				}
			if (activeOrders[string] <= 1){
				if (activeOrders[string] == undefined){
					activeOrders[string] = 0;
				}
			activeOrders[string] += 1;
			}
			
			orders2.push(orders[o]);
		}
			//console.log('activeOrders');
			//console.log(activeOrders);
	dbo.listCollections().toArray(function(err, collInfos) {
		// collInfos is an array of collection info objects that look like:
		// { name: 'test', options: {} }
		for (col in collInfos) {

			dbs.push(collInfos[col].name);
			collections.push(dbo.collection(collInfos[col].name));
		}
		//////////console.log(dbs);				
		////console.log(tickers);

		for (var c in collections){
			var collection = collections[c];
				collection.find({

				}, {
					$exists: true
				}).sort({
					_id: -1

				}).toArray(async function(err, doc3) {
					for (var d in doc3){
						
					//	////////console.log(doc3[d])
						
						//////////console.log(doc3[d].trades);
						if (doc3[d].trades){
							if (activeOrders[doc3[d].trades.k] == undefined){
								(activeOrders[doc3[d].trades.k]) = 0;
							}
						if (doc3[d].trades.bought1 == false){
							var sl = {'activeOrders': activeOrders[doc3[d].trades.k], 'direction': 'buy1', 'pair' : doc3[d].trades.k, 'stoplimit': doc3[d].trades.buy1, 'currentAsk': bestAsk[doc3[d].trades.k], 'percent': (parseFloat(bestAsk[doc3[d].trades.k]) / parseFloat(doc3[d].trades.buy1))}
						if ((activeOrders[doc3[d].trades.k] <= 1) &&  tickers.includes('trade:1m:' + doc3[d].trades.k)){
						stoplimits.push(sl);
							
						}
						}
						if (doc3[d].trades.bought2 == false){
							if (doc3[d].trades.buy2 != undefined){
							//console.log(bestAsk);
							var sl = {'activeOrders': activeOrders[doc3[d].trades.k], 'direction': 'buy2', 'pair' : doc3[d].trades.k, 'stoplimit': doc3[d].trades.buy2, 'currentAsk': bestAsk[doc3[d].trades.k], 'percent': (parseFloat(bestAsk[doc3[d].trades.k]) / parseFloat(doc3[d].trades.buy2))}
							
if ((activeOrders[doc3[d].trades.k] <= 1)&&  tickers.includes('trade:1m:' + doc3[d].trades.k)){
						stoplimits.push(sl);
							
						}								
							}
						} 
						if (doc3[d].trades.sold1 == false){
							var sl = {'activeOrders': activeOrders[doc3[d].trades.k], 'direction': 'sell1', 'pair' : doc3[d].trades.k, 'stoplimit': doc3[d].trades.sell1, 'currentBid': bestBid[doc3[d].trades.k], 'percent': (parseFloat(doc3[d].trades.sell1 / parseFloat(bestBid[doc3[d].trades.k])))}
if ((activeOrders[doc3[d].trades.k] <= 1)&&  tickers.includes('trade:1m:' + doc3[d].trades.k)){
						stoplimits.push(sl);
							
						}							
						}
						if (doc3[d].trades.sold2 == false){
							if (doc3[d].trades.sell2 != undefined){

							var sl = {'activeOrders': activeOrders[doc3[d].trades.k], 'direction': 'sell2', 'pair' : doc3[d].trades.k, 'stoplimit': doc3[d].trades.sell2, 'currentBid': bestBid[doc3[d].trades.k], 'percent': (parseFloat(doc3[d].trades.sell2) / parseFloat(bestBid[doc3[d].trades.k]))}
							
if ((activeOrders[doc3[d].trades.k] <= 1)&&  tickers.includes('trade:1m:' + doc3[d].trades.k)){
						stoplimits.push(sl);
							
						}								
							}
						} 
						}
						totals = []
					totals['USDT'] = []
					totals['BTC'] = []
					totals['ETH'] = []
					
						var cccu = 0;
						var cccb = 0;
						var ccce = 0;
						var pairs = []
							for (var d in trades){
								if (!pairs.includes(trades[d].symbol)){
									pairs.push(trades[d].symbol);
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
							}for (var d in orders2){
								if (!pairs.includes(orders2[d].symbol)){
									pairs.push(orders2[d].symbol);
								if (orders2[d].symbol.slice(-4) == "USDT"){
									
							totals['USDT'].push({'pair': orders2[d].symbol, 'total': 0});
								} else 
								if (orders2[d].symbol.slice(-3) == "BTC"){
									
							totals['BTC'].push({'pair': orders2[d].symbol, 'total': 0});
								} else 
								if (orders2[d].symbol.slice(-3) == "ETH"){
									
							totals['ETH'].push({'pair': orders2[d].symbol, 'total': 0});
								}
								}
							}
							var substrbch = true;
							for (var d in orders2){
								var string = orders2[d].symbol.replace('/', "");
								if (string.slice(-4) == "USDT"){
									string = string.substr(0, string.length -1 );
								}if (string.startsWith("DASH")){
									string = string.substr(4, string.length );
									string = "DSH" + string;
								}if (string.startsWith("IOTA")){
									string = string.substr(4, string.length );
									string = "IOT" + string;
									}
								string = 't' + string;
									//console.log(string);
								//	console.log(bestAsk);
								if (orders2[d].symbol.slice(-4) == "USDT"){
									for (var s in totals['USDT']){
										if (totals['USDT'][s].pair == orders2[d].symbol){
									
							if (orders2[d].side == 'sell'){
											totals['USDT'][s].total += ( parseFloat(orders2[d].price) * parseFloat(orders2[d].amount ));
											//console.log(parseFloat(orders2[d].price) * parseFloat(orders2[d].amount ));
										}else {
											totals['USDT'][s].total = totals['USDT'][s].total - ( parseFloat(orders2[d].price) * parseFloat(orders2[d].amount ));
										}
								cccu++;
										}
									}
								} else 
								if (orders2[d].symbol.slice(-3) == "BTC"){
									for (var s in totals['BTC']){
										if (totals['BTC'][s].pair == orders2[d].symbol){
									if (orders2[d].side == 'sell'){
											totals['BTC'][s].total += ( parseFloat(orders2[d].price)* parseFloat(orders2[d].amount ));
											//console.log(parseFloat(orders2[d].price) * parseFloat(orders2[d].amount ));
										}else {
											totals['BTC'][s].total = totals['BTC'][s].total - ( parseFloat(orders2[d].price) * parseFloat(orders2[d].amount ));
										}
								cccb++;
										}
									}
								} else 
								if (orders2[d].symbol.slice(-3) == "ETH"){
									
									for (var s in totals['ETH']){
										if (totals['ETH'][s].pair == orders2[d].symbol){
									if (orders2[d].side == 'sell'){
											totals['ETH'][s].total += ( parseFloat(orders2[d].price) * parseFloat(orders2[d].amount ));
											//console.log(parseFloat(orders2[d].price) * parseFloat(orders2[d].amount ));
										}else {
											totals['ETH'][s].total = totals['ETH'][s].total - ( parseFloat(orders2[d].price) * parseFloat(orders2[d].amount ));
										}
								ccce++;
										}
									}
								}
							}
							
							for (var d in orders2){
								var string = orders2[d].symbol.replace('/', "");
								if (string.slice(-4) == "USDT"){
									string = string.substr(0, string.length -1 );
								}if (string.startsWith("DASH")){
									string = string.substr(4, string.length );
									string = "DSH" + string;
								}if (string.startsWith("IOTA")){
									string = string.substr(4, string.length );
									string = "IOT" + string;
									}
								
								if (orders2[d].symbol.slice(-4) == "USDT"){
									for (var s in totals['USDT']){
										if (totals['USDT'][s].pair == orders2[d].symbol){
									
							if (orders2[d].side == 'sell'){
																						if (bestAsk[string]){
											totals['USDT'][s].total += ( parseFloat(bestAsk[string]) * parseFloat(orders2[d].amount ));
																						}
																						else {
											totals['USDT'][s].total += ( parseFloat(orders2[d].price) * parseFloat(orders2[d].amount ));

																						}
											//console.log(parseFloat(trades[d].price) * parseFloat(trades[d].amount ));
										}else {
																						if (bestBid[string]){

											totals['USDT'][s].total = totals['USDT'][s].total - (parseFloat(bestBid[string]) * parseFloat(orders2[d].amount));
																						}
																						else {
											totals['USDT'][s].total = totals['USDT'][s].total - (parseFloat(orders2[d].price) * parseFloat(orders2[d].amount));

																						}
										}
								cccu++;
										}
									}
								} else 
									
								if (orders2[d].symbol.slice(-3) == "BTC"){
									for (var s in totals['BTC']){
										if (totals['BTC'][s].pair == orders2[d].symbol){
									if (orders2[d].side == 'sell'){
																																if (bestAsk[string]){

											totals['BTC'][s].total += ( parseFloat(bestAsk[string]) * parseFloat(orders2[d].amount ));
																																} else {
											totals['BTC'][s].total += ( parseFloat(orders2[d].price) * parseFloat(orders2[d].amount ));

																																}
											//console.log(parseFloat(orders2[d].price) * parseFloat(orders2[d].amount ));
										}else {
											if (bestBid[string]){
											totals['BTC'][s].total = totals['BTC'][s].total - (parseFloat(bestBid[string]) * parseFloat(orders2[d].amount));
											}
											else {
											totals['BTC'][s].total = totals['BTC'][s].total - (parseFloat(orders2[d].price) * parseFloat(orders2[d].amount));
											}
										}
								cccb++;
								
									
										}
									}
								} else 
								if (orders2[d].symbol.slice(-3) == "ETH"){
									
									for (var s in totals['ETH']){
										if (totals['ETH'][s].pair == orders2[d].symbol){
									if (orders2[d].side == 'sell'){																						if (bestAsk[string]){

											totals['ETH'][s].total += ( parseFloat(bestAsk[string]) * parseFloat(orders2[d].amount ));
									}
									else {
											totals['ETH'][s].total += ( parseFloat(orders2[d].price) * parseFloat(orders2[d].amount ));

									}
											//console.log(parseFloat(orders2[d].price) * parseFloat(orders2[d].amount ));
										}else {
																						if (bestBid[string]){

											totals['ETH'][s].total = totals['ETH'][s].total - (parseFloat(bestBid[string]) * parseFloat(orders2[d].amount));
																						}
																						else {
											totals['ETH'][s].total = totals['ETH'][s].total - (parseFloat(orders2[d].price) * parseFloat(orders2[d].amount));

																						}
										}
								ccce++;
										}
									}
								}
								string = 't' + string;
								//console.log('string ' + string);
								orders2[d].activeOrders = activeOrders[string]; 
								
							}
					trades.sort(sortFunction3);
					
							for (var d in trades){
								//console.log(trades[d].symbol);
								if (trades[d].symbol.slice(-4) == "USDT"){
									for (var s in totals['USDT']){
										if (totals['USDT'][s].pair == trades[d].symbol){
									
							if (trades[d].side == 'sell'){
											totals['USDT'][s].total += ( parseFloat(trades[d].price) * parseFloat(trades[d].amount ));
											//console.log(parseFloat(trades[d].price) * parseFloat(trades[d].amount ));
										}else {
											totals['USDT'][s].total = totals['USDT'][s].total - (parseFloat(trades[d].price) * parseFloat(trades[d].amount));
										}
								cccu++;
										}
									}
								} else 
								if (trades[d].symbol.slice(-3) == "BTC"){
									for (var s in totals['BTC']){
										if (totals['BTC'][s].pair == trades[d].symbol){
									if (trades[d].side == 'sell'){
											totals['BTC'][s].total += ( parseFloat(trades[d].price) * parseFloat(trades[d].amount ));
											//console.log(parseFloat(trades[d].price) * parseFloat(trades[d].amount ));
										}else {
											totals['BTC'][s].total = totals['BTC'][s].total - (parseFloat(trades[d].price) * parseFloat(trades[d].amount));
										}
								cccb++;
								
									
									
										}0.22828877962087996
									}
								} else 
								if (trades[d].symbol.slice(-3) == "ETH"){
									
									for (var s in totals['ETH']){
										if (totals['ETH'][s].pair == trades[d].symbol){
											
									if (trades[d].side == 'sell'){
											totals['ETH'][s].total += ( parseFloat(trades[d].price) * parseFloat(trades[d].amount ));
											//console.log(parseFloat(trades[d].price) * parseFloat(trades[d].amount ));
										}else {
											totals['ETH'][s].total = totals['ETH'][s].total - (parseFloat(trades[d].price) * parseFloat(trades[d].amount));
										}
								ccce++;
										}
									}
								}
									
									
										
									
							
					}
					}
				});
		}
	setTimeout(async function(){
							//console.log(totals);
						////console.log('1');
							////console.log(balances[0]);
	
							var btcbal = 0;
							const balances = await rest.balances() 
							var bchbal = 0;
							//console.log(balances);
							for (var b in balances){
								if (balances[b].currency == "bch"){
							bchbal +=parseFloat(balances[b].amount);		
								}
								if (balances[b].currency == "btc"){
							btcbal +=parseFloat(balances[b].amount);		
								}
							}
							let positions = await rest.positions()
							//console.log(positions);
	for (let i = 0; i < positions.length; i += 1) {
		var p = positions[i];
		var string2 = p[0];
		var amount = p[2]
		var price = p[3]
		var thepl = p[6]
		
	var string = string2.replace(/(?=.{3}$)/,'/');
	string = string.substr(1, string.length);
	//console.log(string);

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
	if (string.slice(-4) == "USDT"){
									for (var s in totals['USDT']){
										if (totals['USDT'][s].pair == string){
									
											totals['USDT'][s].total += -1 * ( parseFloat(amount) * parseFloat(price ) - parseFloat(thepl));
										}
									}
								} else 
									
								if (string.slice(-3) == "BTC"){
									for (var s in totals['BTC']){
										if (totals['BTC'][s].pair == string){
											totals['BTC'][s].total +=  -1 * ( parseFloat(amount) * parseFloat(price ) - parseFloat(thepl));
								
									
										}
									}
								} else 
								if (string.slice(-3) == "ETH"){
									
									for (var s in totals['ETH']){
										if (totals['ETH'][s].pair == string){
											totals['ETH'][s].total += -1 * ( parseFloat(amount) * parseFloat(price ) - parseFloat(thepl));
										}
									}
								}
	}
							////console.log(orders);
							//for (var o in orders){
							//	//console.log(o);
							//	//console.log(orders[o]);
							//}
								
							var ts = Math.round(new Date().getTime() / 1000) - 1000;
							var tsYesterday = ts - (24 * 3600) - 1000;
								
								var ccc = 0;
							var percent3 =  (100 * (-1 * (1 - (btcbal / startBtc)))).toFixed(4);
							var percent2 =  (100 * (-1 * (1 - (bchbal / startBch)))).toFixed(4);
							var percent =  (percent3 + percent) / 2;
					var diff2 = Math.abs(new Date() - startDate);
					var minutes = Math.floor((diff2/1000)/60);
					var hours = ((diff2/1000)/60 / 60).toFixed(8);
					var percentHr = ((PL ) / hours).toFixed(4);
							//////////console.log(balances.BTC);
							trades.sort(sortFunction3);
							stoplimits.sort(sortFunction);
		//////////console.log(stoplimits);
		////console.log((totals).toString());
		var thetotalusdt = 0;
		for (var t in totals['USDT']){
			thetotalusdt+= totals['USDT'][t].total;
		}		
		var thetotaleth = 0;
		for (var t in totals['ETH']){
			thetotaleth+=totals['ETH'][t].total;
		}		
		var thetotalbtc = 0;
		for (var t in totals['BTC']){
			thetotalbtc+=totals['BTC'][t].total;
		}
		var totaltotal = thetotalbtc * btcusd;
		console.log(totaltotal);
		totaltotal += thetotalusdt;
		console.log(totaltotal);
		
		totaltotal += thetotaleth * ethusd;
		console.log(totaltotal);
		totaltotal = totaltotal;
		console.log(totaltotal);
		
		console.log(totaltotal);
		if (gosend == true){
			gosend = false;
		thetotalbtc = thetotalbtc * Math.pow(10, 8);
		thetotaleth = thetotaleth  * Math.pow(10, 18);
		console.log('PL ' + PL);
		console.log('PL start'+  parseFloat(process.env.plstart));
		res.send('<head><link rel="icon" href="https://polofibbmonster.herokuapp.com/favicon.ico?v=2" /><meta http-equiv="refresh" content="120"><script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script></head><h1>Don\'t Panic! If the data seems off, wait a minute or so.</h1>'
		+ 'current time: ' + new Date()
		+ 'minutes: ' + minutes + '<br>'
		+ 'hours: ' + hours + '<br>'
		+ '<h1>PL: ' + (PL) + '%</h1>'
		+ '<h1>percent/hr: ' + percentHr + '%</h1>'
		+ '<h2>usdt gains (usdt): ' + thetotalusdt + '</h2>'
		+ '<h2>btc gains (btc only) (sats): ' + thetotalbtc + '</h2>'
		+ '<h2>eth gains (wei): ' + thetotaleth + '</h2>'
		+ '<h1>total gains (usdt) (since trade history, including positions not listed here, including open orders IF SOLD (the above PL value is more accurate to judge the bot\'s performance)): ' + totaltotal + '</h1>'
		+ '<div style="display:none;" id="stoplimits">' + JSON.stringify(stoplimits) + '</div>'
		+ '<div style="display:none;" id="orders2">' + JSON.stringify(orders2) + '</div>'
		+ '<div style="display:none;" id="trades">' + JSON.stringify(trades) + '</div>'
		+ '<div style="display:none;" id="totalsusd">' + JSON.stringify(totals['USDT']) + '</div>'
		+ '<div style="display:none;" id="totalseth">' + JSON.stringify(totals['ETH']) + '</div>'
		+ '<div style="display:none;" id="totalsbtc">' + JSON.stringify(totals['BTC']) + '</div>'
		+ 'Actual closed totals 24hrs:'
		+ '<div id="showData5"></div><div id="showData6"></div><div id="showData7"></div><br>stoplimits:'
		+ '<div id="showData"></div><br>open orders: (' + orders2.length + ')'
		+ '<div id="showData2"></div><br>closed orders 24hrs: (max 200) (' + trades.length + ')'
		+ '<div id="showData3"></div>'
		+ '<script>for(var col=[],i=0;i<JSON.parse($("#totalsusd").text()).length;i++)for(var key in JSON.parse($("#totalsusd").text())[i])-1===col.indexOf(key)&&col.push(key);var table7=document.createElement("table");for(tr=table7.insertRow(-1),i=0;i<col.length;i++){(th=document.createElement("th")).innerHTML=col[i],tr.appendChild(th)}for(i=0;i<JSON.parse($("#totalsusd").text()).length;i++){tr=table7.insertRow(-1);for(var j=0;j<col.length;j++){(tabCell=tr.insertCell(-1)).innerHTML=JSON.parse($("#totalsusd").text())[i][col[j]]}}var divContainer5=document.getElementById("showData5");divContainer5.innerHTML="",divContainer5.appendChild(table7);for(col=[],i=0;i<JSON.parse($("#totalsbtc").text()).length;i++)for(var key in JSON.parse($("#totalsbtc").text())[i])-1===col.indexOf(key)&&col.push(key);var table8=document.createElement("table");for(tr=table7.insertRow(-1),i=0;i<col.length;i++){(th=document.createElement("th")).innerHTML=col[i],tr.appendChild(th)}for(i=0;i<JSON.parse($("#totalsbtc").text()).length;i++){tr=table7.insertRow(-1);for(j=0;j<col.length;j++){(tabCell=tr.insertCell(-1)).innerHTML=JSON.parse($("#totalsbtc").text())[i][col[j]]}}var divContainer6=document.getElementById("showData6");divContainer6.innerHTML="",divContainer6.appendChild(table8);for(col=[],i=0;i<JSON.parse($("#totalseth").text()).length;i++)for(var key in JSON.parse($("#totalseth").text())[i])-1===col.indexOf(key)&&col.push(key);var table9=document.createElement("table");for(tr=table7.insertRow(-1),i=0;i<col.length;i++){var th;(th=document.createElement("th")).innerHTML=col[i],tr.appendChild(th)}for(i=0;i<JSON.parse($("#totalseth").text()).length;i++){tr=table7.insertRow(-1);for(j=0;j<col.length;j++){var tabCell;(tabCell=tr.insertCell(-1)).innerHTML=JSON.parse($("#totalseth").text())[i][col[j]]}}var divContainer7=document.getElementById("showData7");divContainer7.innerHTML="",divContainer7.appendChild(table9);for(var col=[],i=0;i<JSON.parse($("#stoplimits").text()).length;i++)for(var key in JSON.parse($("#stoplimits").text())[i])-1===col.indexOf(key)&&col.push(key);var table2=document.createElement("table");for(tr=table2.insertRow(-1),i=0;i<col.length;i++){var th=document.createElement("th");th.innerHTML=col[i],tr.appendChild(th)}for(i=0;i<JSON.parse($("#stoplimits").text()).length;i++){tr=table2.insertRow(-1);for(var j=0;j<col.length;j++){var tabCell=tr.insertCell(-1);tabCell.innerHTML=JSON.parse($("#stoplimits").text())[i][col[j]]}}var divContainer2=document.getElementById("showData");divContainer2.innerHTML="",divContainer2.appendChild(table2);for(var col=[],i=0;i<JSON.parse($("#orders2").text()).length;i++)for(var key in JSON.parse($("#orders2").text())[i])-1===col.indexOf(key)&&col.push(key);var table3=document.createElement("table");for(tr=table3.insertRow(-1),i=0;i<col.length;i++){(th=document.createElement("th")).innerHTML=col[i],tr.appendChild(th)}for(i=0;i<JSON.parse($("#orders2").text()).length;i++){tr=table3.insertRow(-1);for(var j=0;j<col.length;j++){(tabCell=tr.insertCell(-1)).innerHTML=JSON.parse($("#orders2").text())[i][col[j]]}}var divContainer3=document.getElementById("showData2");divContainer3.innerHTML="",divContainer3.appendChild(table3);for(col=[],i=0;i<JSON.parse($("#trades").text()).length;i++)for(var key in JSON.parse($("#trades").text())[i])-1===col.indexOf(key)&&col.push(key);var table4=document.createElement("table");for(tr=table4.insertRow(-1),i=0;i<col.length;i++){var th;(th=document.createElement("th")).innerHTML=col[i],tr.appendChild(th)}for(i=0;i<JSON.parse($("#trades").text()).length;i++){tr=table4.insertRow(-1);for(j=0;j<col.length;j++){var tabCell;(tabCell=tr.insertCell(-1)).innerHTML=JSON.parse($("#trades").text())[i][col[j]]}}var divContainer4=document.getElementById("showData3");divContainer4.innerHTML="",divContainer4.appendChild(table4);</script>');
							
							}
					
	},(1000));
	});
	}catch(err){
		res.send('<head><link rel="icon" href="https://polofibbmonster.herokuapp.com/favicon.ico?v=2" /><meta http-equiv="refresh" content="120"></head>err: ' + err);
	}
}
var seventeen = 1200;
var godoks = true;
setInterval(function(){
	doks();
}, 600000);
function doks(){
	trades2 = []
	if (godoks == true){
	godoks = false;
	setTimeout(function(){
	dodoget(ks, 0, ks.length);
	//console.log(ks.length);
	}, seventeen);
}
}
async function dodoget(ks, i, length){

	if (ks[i]){
	var string = ks[i].replace(/(?=.{3}$)/,'/');
	string = string.substr(1, string.length);
	//console.log(string);
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
		//console.log(string);
		
							var ts = Math.round(new Date().getTime() / 1000) - 1000;
							var tsYesterday = ts - (24 * 3600) - 1000;
	let trades3 = await bitfinexapi.fetchMyTrades(string, tsYesterday);
	for (var o in trades3){
		////console.log(trades2[o])
		trades2.push(trades3[o]);
	}
		if ((i + 1) < ks.length - 1){
			console.log('dodoagain');
			console.log(i)
	setTimeout(async function(){
		dodoget(ks, i + 1, ks.length);
	}, seventeen * 4);
		}
		else{
		console.log('trades exec 1');
			trades = trades2;
			if (maxclosed < trades.length){
			maxclosed = trades.length;
		}
		}
	}catch(err){
	if (err.toString().indexOf('Rate') != -1){
	setTimeout(async function(){
		dodoget(ks, i, ks.length);
	}, seventeen * 22);
	
	}else{if ((i + 1) < ks.length - 1){
		setTimeout(async function(){
		dodoget(ks, i + 1, ks.length);
	}, seventeen * 4);
	} else {
		console.log('trades exec 3');
				trades = trades2;

	}
	}
	}
	} else {
		console.log('trades exec 2');
		trades = trades2;

	}
}
app.get('/', function(req, res) {
	try {
		doget(req, res);
	} catch (err){
		
		setTimeout(function(){
		doget(req, res);
		}, 20000);
	}
});

			app.listen(process.env.PORT || 8080, function() {});
						////console.log('2');
//poloniex.subscribe('BTC_ETC');
 var vols = [];
	var winnas = []
 var doVols = false;
 var pairs = [];
 var basePairs = [];

	function updateStoplimits(wp, collection){
		if (wp.k == 'tXMRBTC'){
		console.log(wp);
		}

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
	
		//console.log(result.result);
	});
	}
					}
					});
				}
 
 function insert(wp, collection){
	//console.log(wp);
	
			collection.find({

				}, {
					$exists: true
				}).sort({
					_id: -1

				}).toArray(function(err, doc3) {
					console.log(err);
					if (doc3 != undefined){
					if (doc3.length == 0){
	 console.log('insert');
						collection.insertOne({
				'trades': wp
			}, function(err, res) {
				if (err) 
				
			if (wp.currencyPair == "BTC_BCH"){
				////////console.log(wp);
			}
			  //////console.log(res.result);
			}); 
					}
					} 	else {
 console.log('insert');
						collection.insertOne({
				'trades': wp
			}, function(err, res) {
				if (err) 
				
			if (wp.currencyPair == "BTC_BCH"){
				////////console.log(wp);
			}
			  //////console.log(res.result);
			}); 
					}					
				})
			
 }
 
 var btceth = 0;
 var btcxmr = 0;
 var btcUSD = 0;
 var msgcount = 0;
var dbs = []
var collections = []
setTimeout(function(){
MongoClient.connect(process.env.mongodb || mongodb, function(err, db) {
	
	var dbo = db.db(process.env.thedatabase)
	var count = 0;
	dbo.listCollections().toArray(function(err, collInfos) {
		// collInfos is an array of collection info objects that look like:
		// { name: 'test', options: {} }
		for (col in collInfos) {

			dbs.push(collInfos[col].name);
			collections.push(dbo.collection(collInfos[col].name));
		}
		//////////console.log(dbs);
						////////////console.log('settimeout');
						doCollections(collections);
				setInterval(function() {
					doCollections(collections);
				}, 25500);
	});
});
}, 10000);

function doCollections(collections, balances){
							
							
						//////console.log('8'); 
			
	
			
			//////////console.log(balances.BTC);
			
			var count = 0;
							
			for (var c in collections) {
				var collection = collections[c];
				collectionDo(collection);



							}
		
}
var godobuy = false;
var godosell = false;

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
					//////console.log(tsHour);
					
					/*
					const o = new CancelOrder({
						order: 
					  }, ws)

					  let closed = false

					  // Enable automatic updates
					  o.registerListeners()
					o.on('error', () => {
						//console.log('error');
					});
					  o.on('update', () => {
						//console.log('order updated: %j', o.serialize())
						
					  })

					  o.on('close', () => {
						//console.log('order closed: %s', o.status)
						closed = true
					  })

					  //console.log('submitting order %d', o.cid)

					  o.submit().then(() => {
						//console.log('got submit confirmation for order %d [%d]', o.cid, o.id)
					  });
					/*
						for (var d in data){
								if (data[d].length > 0){
									for (var a in data[d]){
										data[d][a].pair = d;
										//////console.log(data[d][a].type);
										if (data[d][a].type == "buy"){
										data[d][a].currentBid = bestBid[data[d][a].pair];
										var date = new Date(data[d][a].date).getTime() / 1000;
											//////console.log(date); 
										var date2 = startDate.getTime() / 1000;
										if (date <= tsHour && date >= date2){
											////console.log(parseFloat(data[d][a].orderNumber));
											////console.log('cancel cancel!');
											
											
											poloniex.cancelOrder(parseFloat(data[d][a].orderNumber), function(data){
												////console.log('cancelled');
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
									////console.log(data3);
									

								});
								}
							}
							*/
							////console.log(d3d.trades.currencyPair);
							//////console.log('ds: ');
							//////console.log(ds);
							
							
							
							
							
							
							// you can simulate closed orders by .. closing orders
							
							if (d3d.trades.currencyPair){
								if (d3d.trades.bought1 == true && d3d.trades.bought2 == true && ((d3d.trades.buyorder1 == 0) &&((d3d.trades.buyorder2 == 0)))){
									if (d3d.trades.bought1 == true){
									////console.log('bought1 and bought2 true');
								} 
								activeOrders[d3d.trades.k] = activeOrders[d3d.trades.k] - 1
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
									   
										//////console.log(result.result);
															

									});
								
								} 
								
								if (d3d.trades.sold1 == true && d3d.trades.sold2 == true && ((d3d.trades.sellorder1 == 0 ) &&((d3d.trades.sellorder2 == 0 )))){
									if (d3d.trades.sold1 == true){
									////console.log('sold1 and sold2 true');
								}
								activeOrders[d3d.trades.k] = activeOrders[d3d.trades.k] - 1
									d3d.trades.sold1 = false;
									d3d.trades.sold2 = false;
									collection.update({
									}, {
										$set: {
											"trades": d3d.trades
										}
									}, { multi: true },
									function(err, result) {
									   
										//////console.log(result.result);
															

									});
								}
								}
								}
							
						if (d3d.trades.bought1 == false){
							
						if (parseFloat(bestAsk[d3d.trades.k]) <= (d3d.trades.buy1 * 1.005) && parseFloat(bestAsk[d3d.trades.k]) > 0.00000200)	 {
							//////////console.log(d3d.trades.last);
							//////////console.log(d3d.trades);
							d3d.trades.bought1 = true;
							if (godobuy == true){
								godobuy = false;

							console.log('dobuy:');
							////console.log(d3d);
							collection.update({
								}, {
									$set: {
										"trades": d3d.trades
									}
								}, { multi: true },
								function(err, result) {
								   
									//////console.log(result.result);
														

								});
							buy(d3d.trades.k, d3d.trades.sell1, d3d.trades.buy1);
							}
						}
						}
						if (d3d.trades.buy2) {
							if (parseFloat(bestAsk[d3d.trades.k])<= (d3d.trades.buy2 * 1.005) && d3d.trades.bought2 == false && parseFloat(bestAsk[d3d.trades.k]) > 0.00000200) {
							//////////console.log(d3d.trades.last);
							//////////console.log(d3d.trades);
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
								   
									//////console.log(result.result);
														

								});
							console.log('dobuy2:');
							buy(d3d.trades.k, d3d.trades.buy2, d3d.trades.buy1);
							}
							}
						}
						if (d3d.trades.k == 'tSNTUSD'){
						//console.log(d3d.trades.k);
						//console.log(d3d.trades.sold1);
						//console.log(parseFloat(bestBid[d3d.trades.k]))
						//console.log(d3d.trades.sell1);
						}
						if (d3d.trades.sold1 == false){
						if (parseFloat(bestBid[d3d.trades.k]) >= (d3d.trades.sell1 * 0.995) && parseFloat(bestAsk[d3d.trades.k]) > 0.00000200) {
							//////////console.log(d3d.trades.last);
							//////////console.log(d3d.trades);
							d3d.trades.sold1 = true;
							if (godosell == true){
								godosell = false;

							console.log('dosell');
							//console.log(d3d);
							collection.update({
								}, {
									$set: {
										"trades": d3d.trades
									}
								}, { multi: true },
								function(err, result) {
								   
									//////console.log(result.result);
														

								});
						sell(d3d.trades.k, d3d.trades.sell1, d3d.trades.buy1);
							}
						}
						}
						if (d3d.trades.sell2) {
							if (parseFloat(bestBid[d3d.trades.k]) >= (d3d.trades.sell2 * 0.995) && d3d.trades.sold2 == false && parseFloat(bestAsk[d3d.trades.k]) > 0.00000200 ){
							//////////console.log(d3d.trades.last);
							//////////console.log(d3d.trades);
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
								   
									//////console.log(result.result);
														

								});
							console.log('dosell2:');
						sell(d3d.trades.k, d3d.trades.sell2, d3d.trades.sell1);
							}
							}
						}
						}
						})
					}
					
					
   
var dbo;
				MongoClient.connect(process.env.mongodb || mongodb, function(err, db) {
					
				dbo = db.db(process.env.thedatabase)
				////////console.log('dbo');
				
				});
