import {FlowRouter} from 'meteor/kadira:flow-router';
import {BlazeLayout} from 'meteor/kadira:blaze-layout';

FlowRouter.route('/', {
    action: function(params, queryParams) {
      BlazeLayout.render('home');
    }
});

FlowRouter.route('/payment_status', {
    action: function(params, queryParams) {
      BlazeLayout.render('paymentStatus');
    }
});

FlowRouter.route('/transaction/:transactionId' , {
    action: function(params, queryParams) {
      BlazeLayout.render('transaction');
    }
});
