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
var XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest;
const jsdom = require('jsdom');

const {JSDOM} = jsdom;
const CONNECTION_STRING = process.env.DB; //MongoClient.connect(CONNECTION_STRING, function(err, db) {});

/*
x - Set the content security policies to only allow loading of scripts and css from your server.
I can GET /api/stock-prices with form data containing a Nasdaq stock ticker and recieve back an object stockData.
In stockData, I can see the stock(string, the ticker), price(decimal in string format), and likes(int).
I can also pass along field like as true(boolean) to have my like added to the stock(s). Only 1 like per ip should be accepted.
If I pass along 2 stocks, the return object will be an array with both stock's info but instead of likes, it will display rel_likes(the difference between the likes on both) on both.
A good way to receive current price is the following external API(replacing 'GOOG' with your stock): https://finance.google.com/finance/info?q=NASDAQ%3aGOOG
All 5 functional tests are complete and passing.
*/


module.exports = function (app) {

  app.route('/api/stock-prices')
  
    // I can GET /api/stock-prices with form data containing a Nasdaq stock ticker and recieve back an object stockData.
    .get(function (req, res){
      let stock = req.query.stock; // to be retrieved from the request
      // let requestUrl = "https://finance.google.com/finance/info?q=NASDAQ%3a" + stock;
      let requestUrl = "https://finance.yahoo.com/quote/ROKU?p=ROKU&.tsrc=fin-tre-srch"
      let xhr = new XMLHttpRequest();
        
      xhr.open('GET', requestUrl, true);
      // xhr.onreadystatechange = function(){
      //   if (xhr.readyState === 4 && xhr.status === 200) {
      //     res.send(xhr.responseText);
      //   } else if(xhr.readyState === 4 && xhr.status === 403) {
      //     res.send(requestUrl);          
      //   } else {
      //     console.log(xhr.readyState, xhr.status, xhr.responseText.length);
      //   }
      // }
      xhr.onload = function() {
        // var el = document.createElement('el');
        // el.innerHTML = xhr.responseText;
        // console.log(el.findByClassName("Trsdu(0.3s) Trsdu(0.3s) Fw(b) Fz(36px) Mb(-4px) D(b)"));
        let dom = new JSDOM(xhr.responseText);
        let body = dom.window.document.body;
        // console.log(body.querySelector("#quote-header-info div.My\(6px\).Pos\(r\).smartphone_Mt\(6px\) div.D\(ib\).Va\(m\).Maw\(65\%\).Maw\(60\%\)--tab768.Ov\(h\) div span.Trsdu\(0\.3s\).Fw\(b\).Fz\(36px\).Mb\(-4px\).D\(ib\)"));
        // console.log(body.querySelector("#quote-header-info > div.My\\(6px\\).Pos\\(r\\).smartphone_Mt\\(6px\\) > div.D\\(ib\\).Va\\(m\\).Maw\\(65\\%\\).Maw\\(60\\%\\)--tab768.Ov\\(h\\) > div > span.Trsdu\\(0\\.3s\\).Fw\\(b\\).Fz\\(36px\\).Mb\\(-4px\\).D\\(ib\\)").innerHTML);
        // console.log(body.querySelector("#quote-header-info").querySelector(".span").innerHTML);
        console.log(body.querySelect("#quote-header-info").children)
      }
      xhr.send();
      res.send(stock);
            
    
    });
    
};
