import { Meteor } from 'meteor/meteor';
import {HTTP} from 'meteor/http';
import querystring from 'querystring';
import jsSHA from "jssha";





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

    //fetch the transaction by id here
    // const transaction = Transactions.findOne({"_id": transactionId });
    // transaction.hash === res.content.result[0].postBackParam.hash

    var data = querystring.stringify({
        merchantKey: Meteor.settings.public.payu_key,
        merchantTransactionIds: transactionId
    });

    var headers = {
              'Content-Type': 'application/json',
              'Content-Length': Buffer.byteLength(data),
              'content': data,
              'accept': '*/*',
              'Authorization': Meteor.settings.private.payu_authorization,
          }


      // this.unblock();
      try {

        HTTP.call("POST","https://test.payumoney.com:443/payment/op/getPaymentResponse?" + data ,
                { headers: headers },
                function (err, res) {
                  if (!err) {
                    console.log(res);
                  }
                });



      } catch (e) {

        return false;
      }


  }

});
