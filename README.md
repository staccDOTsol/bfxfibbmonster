# bfxfibbmonster

The bot is currently set up to run on Ethfinex:

https://www.ethfinex.com/?refcode=hfT8i73kyT

Donations also welcome:

0x3CE52a2a8c60fA944d2ff7ccDA563fe81d0D16F7 (Eth)

If you wanted to fork this repo and replace these lines in BFX.js it'll work perfectly on Bitfinex, however they don't run a referral program so do consider a donation:

 ws: {
    url: "wss://api.ethfinex.com/ws/2",
    agent
  },

  rest: {
    url: "https://api.ethfinex.com",
    agent
  }
  
  with:
  
   ws: {
    url: WS_URL,
    agent
  },

  rest: {
    url: REST_URL,
    agent
  }

Pull requests also welcome :)

Here's my first two ref signups:

first guy:

https://dimas16ethfinexbot.herokuapp.com/

2nd guy (coinbase withdrawal delayed):

https://kwitzachethfinexbot.herokuapp.com/

Yes, absolutely, for those concerned with the security of their API keys they can run their own bot on their own Node server.

Step 1. sign up for Heroku (free)
Step 2. Fork my bot repo https://github.com/DunnCreativeSS?tab=repositories bfxfibbmonster is the Ethfinex one, bitmexfibbmarginmonster for bitmex (which is largely untested).
Step 3. get a MongoDb somewhere on the cloud (you can get one free from MongoDB Atlas)
Step 4. in Heroku under Settings -> Reveal config vars, you'll want to set up your process.env. variables. 

Note that you can git clone the code to your local machine, rather than run it in the cloud. You can also run mongod server on your local machine and use the environment variable $env:mongodb="mongodb://localhost:27017" In Windows powershell you can set environment variables for that session like:

$env:thedatabase="thedb"

These are:

bapi: 1st Ethfinex api key
bkey: 2nd Ethfinex api secret
bapi2: 2nd Ethfinex api key
bkey2: 2nd Ethfinex api secret
btcusd: the value of btcusd, can update this daily, it's used only for the web app to show you your usd earnings and not for anything else in the script
email: Your email for trade notifications. Be sure to whitelist jarettrsdunn@gmail.com in your email client.
mnstart: your net USD worth of Eth/Tokens you deposit into Ethfinex. This is used to calculate your % winnings/losings on the site.
mongodb: will look like this, you'll get it from your provider. If you do use Atlas remember to whitelist the 0.0.0.0/0 IPs. mongodb+srv://jare:<PASSWORD>@cluster0-8dygf.mongodb.net/test?retryWrites=true
SENDGRID_API_KEY: you can use mine I'm unsure what the limit on emails are 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
thedatabase: (any unique name)

I built a bot first for Poloniex then for Bitfinex and it's as easy as switching 2 lines of code to get it to work on Ethfinex. Note that the attached backtests are for the bot running Ethfinex pairs on Bitfinex because the backtest suite didn't support Ethfinex out of the box.

In return for being able to run my bot with your balance, I ask that you sign up to Ethfinex using my affiliate link. Non-verified accounts can still deposit and withdraw, however they won't be able to take part in the NEC fee rebate until verified (but earnings are backdated).

If you trade as a maker on Ethfinex, half the maker fees and half the taker fees are refunded to you once a month (on the 14th) in NEC tokens on Ethfinex. This might not sound like a lot but hear me out: when I was running this bot on 0.1 Bitcoin Cash balance on Bitfinex (~$100) I managed to put $10k USD worth of volume through the order books in 1-2 days (and still turn a profit). If you extrapolate, that could be a ton of fee rebates seeing as how the bot is a maker 3/4 of the time.

The bot should outperform the backtests, as I was unable to find a way to accurately backtest selling/buying half the trade value at a limit and the other half at a trailing stop (which the bot does, to maximize profits).

The bot analyzes the last day's trading activity and sets stop limit reminders for itself to buy/sell at the next down/up Fibonacci levels. It then sells/buys back in at the next Fib level up/down, and 1/2 the value is put into a trailing stop.

I backtested the bot on SAN/BTC, GNT/BTC, TRX/BTC which are all pairs available on Ethfinex (and Bitfinex for backtesting), for a period of ~four months during both an uptrend and downtrend.

---I had posted this previously for Bitfinex and without relevant backtests, and then found that Bitfinex no longer has an affiliate program. The community also asked for backtests, so I took a day or two to learn how to backtest using Catalyst for Python (while brushing up on my Python skills) to bring you these results---

Backtest results:

SAN/BTC (black):

https://www.screencast.com/t/DZFdA3dDpfEM

March-July test

Buy n hodl: ~31% losses

Bot: ~101% gains

GNT/BTC (blue):

https://www.screencast.com/t/3NwaMpKC

March-July test

Buy n hodl: ~20% gains

Bot: ~119% gains

TRX/BTC (green):

https://www.screencast.com/t/u7pi0Grmx4

March-July test

Buy n hodl: ~17% gains

Bot: ~28% gains

Three more at random, including one at losses to prove I'm not cherry picking (note that the bot works on many pairs at once vs. a single one)

DAT/BTC (Green): https://www.screencast.com/t/9T1sFuQs Buy n hodl: ~30% gains Bot: ~1459% gains!

OMG/BTC (Black): https://www.screencast.com/t/gWWxog0xizQ Buy n hodl: ~ 8% losses Bot: ~ 13% losses :(

ZRX/BTC (Blue): https://www.screencast.com/t/rJXSO67o Buy n hodl: ~42% gains Bot: 172% gains

Sign up here: https://www.ethfinex.com/?refcode=hfT8i73kyT

Deposit

Generate two sets of API keys (one for REST calls and one for WebSocket calls)

send me your API keys (and email address if you want notifications on trades) and I'll set you up on a Heroku server with a basic interface. Here's one I set up last night:

https://dimas16ethfinexbot.herokuapp.com/

Note that his 444+% gains are because of his initial deposit. This is accurate: total gains (usdt) (since trade history, including positions not listed here, including open orders): 10.81

If you want to risk the bot on Bitmex there's still some work to do to figure out the optimal margin configuration. I kept losing due to 1% shifts on price and liquidation on max. margin. I'm testing it now on Bitmex testnet and 1/10 margin, we'll see what happens.

Sign up here: https://www.bitmex.com/register/VRBFuQ

Deposit

Generate an API key

Send it to me, and we should discuss what level of margin you're comfortable with the bot trading @

I'll set you up with the same kind of Heroku server to run your bot.
