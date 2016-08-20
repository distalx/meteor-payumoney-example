import { Meteor } from 'meteor/meteor';

import jsSHA from "jssha";


var querystring = require('querystring');
var http = require('https');

Meteor.startup(() => {
  // code to run on server at startup
});

Meteor.methods({
  processPayment:function(data){

    // add cart varification here !!

    var hashString = Meteor.settings.public.payu_key + "|" +
                     data.txnid + "|" +
                     data.amount + "|" +
                     data.productinfo + "|" +
                     data.firstname + "|" +
                     data.email + "|||||||||||" +
                     Meteor.settings.private.payu_salt;

    var shaObj = new jsSHA("SHA-512", "TEXT");
    shaObj.update(hashString);
    var hash = shaObj.getHash("HEX");

    return hash;

  }
});

Meteor.methods({
  getPaymentResponse:function(transactionId){


    var data = querystring.stringify({
        merchantKey: Meteor.settings.public.payu_key,
        merchantTransactionIds: transactionId
    });
    var options = {
        hostname: 'test.payumoney.com',
        port: 443,
        path: '/payment/op/getPaymentResponse?'+data,
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Content-Length': Buffer.byteLength(data),
            'content': data,
            'accept': '*/*',
            'Authorization': Meteor.settings.private.payu_authorization,
        }
    };

    var req = http.request(options, function(res) {

        res.setEncoding('utf8');
        res.on('data', function(chunk) {    // data will be available in callback

            console.log("body: " + chunk);
        });
    });
    req.on('error',function(e){
      console.log('Error'+ e.message);
    });
    req.write(data);
    req.end();
  }
});
