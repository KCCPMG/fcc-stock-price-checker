/*
*
*
*       Complete the API routing below
*
*
*/

'use strict';

var expect = require('chai').expect;
var MongoClient = require('mongodb');
var mongoose = require('mongoose');
var XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest;
const jsdom = require('jsdom');

const {JSDOM} = jsdom;
const CONNECTION_STRING = process.env.CONNECTION_STRING; //MongoClient.connect(CONNECTION_STRING, function(err, db) {});

mongoose.connect(CONNECTION_STRING, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  dbName: "Stocks"
})
const db = mongoose.connection;

db.on('error', function(err) {
  console.log(err);
})

db.once('open', function() {
  console.log('They\re connected!');
})

const stockSchema = new mongoose.Schema({
  stock: {
    type: String,
    required: true
  },
  likes: {
    type: Number,
    required: true
  }
})

var Stock = mongoose.model('stock', stockSchema);

/*
x - Set the content security policies to only allow loading of scripts and css from your server.
I can GET /api/stock-prices with form data containing a Nasdaq stock ticker and recieve back an object stockData.
In stockData, I can see the stock(string, the ticker), price(decimal in string format), and likes(int).
I can also pass along field like as true(boolean) to have my like added to the stock(s). Only 1 like per ip should be accepted.
If I pass along 2 stocks, the return object will be an array with both stock's info but instead of likes, it will display rel_likes(the difference between the likes on both) on both.
x - A good way to receive current price is the following external API(replacing 'GOOG' with your stock): https://finance.google.com/finance/info?q=NASDAQ%3aGOOG
All 5 functional tests are complete and passing.
*/


module.exports = function (app) {

  app.route('/api/stock-prices')
    
    // I can GET /api/stock-prices with form data containing a Nasdaq stock ticker and recieve back an object stockData.
    .get(function(req,res) {
      let ticker = req.query.stock;
    
      // res.send(req.query);
    
      let api_url = "https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=" + ticker + "&interval=5min&apikey=" + process.env.ALPHA_VANTAGE_API_KEY;
      console.log(api_url);
    
      function getPrice() {
        return new Promise(function(resolve, rejet){
          
        })
        
        
        
        
        
        
        let xhr = new XMLHttpRequest();
        let price;
        xhr.onreadystatechange = function() {
          console.log(xhr.readyState, xhr.status);
          if (this.readyState === 4) {
            if (this.status === 200) {
              let obj = JSON.parse(this.responseText);
              if (obj["Error Message"] === "Invalid API call. Please retry or visit the documentation (https://www.alphavantage.co/documentation/) for TIME_SERIES_INTRADAY.") {
                price = ("invalid stock")
              } else {
                let lastRefreshed = obj["Meta Data"]["3. Last Refreshed"];
                price = (obj["Time Series (5min)"][lastRefreshed]['4. close']);
              }
            } else {
              price = ("bad connection");
            }
          } 
        }
        xhr.open('GET', api_url);
        xhr.responseType='json';
        xhr.send();
      }
    
      async function respond() {
        let price = await getPrice();
        res.send(price);
      }
      
      respond();
    
    
    
    
    
    
    
//       let xhr = new XMLHttpRequest();
    
//       xhr.onreadystatechange = function() {
//         console.log(xhr.readyState, xhr.status);
//         if (this.readyState === 4) {
//           if (this.status === 200) {
//             // console.log(this.responseType);
//             let obj = JSON.parse(this.responseText);
//             if (obj["Error Message"] === "Invalid API call. Please retry or visit the documentation (https://www.alphavantage.co/documentation/) for TIME_SERIES_INTRADAY.") {
//               res.send("invalid stock")
//             } else {
//               // console.log(typeof obj);
//               // console.log(obj["Meta Data"]);
//               let lastRefreshed = obj["Meta Data"]["3. Last Refreshed"];
//               // console.log(lastRefreshed);
//               // console.log(obj["Time Series (5min)"][lastRefreshed]['4. close']);
//               let price = (obj["Time Series (5min)"][lastRefreshed]['4. close']);
//               // res.json({stockData : {stock : ticker, price : price}})
//             }
//           } else {
//             // res.send("bad connection");
//           }
//         } 
//       }
//       xhr.open('GET', api_url);
//       xhr.responseType='json';
//       xhr.send();
      
      

    });
  
  
    // I can GET /api/stock-prices with form data containing a Nasdaq stock ticker and recieve back an object stockData.
//     .get(function (req, res){
//       let stock = req.query.stock; // to be retrieved from the request
//       // let requestUrl = "https://finance.google.com/finance/info?q=NASDAQ%3a" + stock;
//       let requestUrl = "https://finance.yahoo.com/quote/ROKU?p=ROKU&.tsrc=fin-tre-srch"
//       let xhr = new XMLHttpRequest();
        
//       xhr.open('GET', requestUrl, true);
//       // xhr.onreadystatechange = function(){
//       //   if (xhr.readyState === 4 && xhr.status === 200) {
//       //     res.send(xhr.responseText);
//       //   } else if(xhr.readyState === 4 && xhr.status === 403) {
//       //     res.send(requestUrl);          
//       //   } else {
//       //     console.log(xhr.readyState, xhr.status, xhr.responseText.length);
//       //   }
//       // }
//       xhr.onload = function() {
//         // var el = document.createElement('el');
//         // el.innerHTML = xhr.responseText;
//         // console.log(el.findByClassName("Trsdu(0.3s) Trsdu(0.3s) Fw(b) Fz(36px) Mb(-4px) D(b)"));
//         let dom = new JSDOM(xhr.responseText);
//         let body = dom.window.document.body;
//         // console.log(body.querySelector("#quote-header-info div.My\(6px\).Pos\(r\).smartphone_Mt\(6px\) div.D\(ib\).Va\(m\).Maw\(65\%\).Maw\(60\%\)--tab768.Ov\(h\) div span.Trsdu\(0\.3s\).Fw\(b\).Fz\(36px\).Mb\(-4px\).D\(ib\)"));
//         // console.log(body.querySelector("#quote-header-info > div.My\\(6px\\).Pos\\(r\\).smartphone_Mt\\(6px\\) > div.D\\(ib\\).Va\\(m\\).Maw\\(65\\%\\).Maw\\(60\\%\\)--tab768.Ov\\(h\\) > div > span.Trsdu\\(0\\.3s\\).Fw\\(b\\).Fz\\(36px\\).Mb\\(-4px\\).D\\(ib\\)").innerHTML);
//         // console.log(body.querySelector("#quote-header-info").querySelector(".span").innerHTML);
        
//         // console.log(body.querySelector("#quote-header-info").children[2].className)
//         // console.log(body.querySelector("#quote-header-info").children[2].innerHTML)
//         // console.log(body.querySelector("#quote-header-info").children[2].children[0].innerHTML);
//         // console.log(body.querySelector("#quote-header-info").children[2].children[0].children[0].innerHTML);
//         let header = body.querySelector("#quote-header-info");
//         console.log(header.innerHTML);
//         let data_rectid_13 = header.querySelector("div");
//         console.log(data_rectid_13.innerHTML);
//         let span = data_rectid_13.querySelector("span");
//         console.log(span.innerHTML);
//         let result = span.innerHTML;
//         console.log(result);
//       }
//       xhr.send();
//       res.send(stock);
//     });
    
};
