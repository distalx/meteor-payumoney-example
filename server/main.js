import { Meteor } from 'meteor/meteor';

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
