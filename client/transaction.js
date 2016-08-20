import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import './transaction.html';

Template.transaction.onCreated(function transaction() {
  var instance = this;

  instance.transactionId = new ReactiveVar(FlowRouter.getParam('transactionId'));
  instance.paymentResponse = new ReactiveVar();
  this.autorun(() => {
    var transactionId = instance.transactionId.get();

    Meteor.call('getPaymentResponse',transactionId,function(error, result) {
        if(error){
          console.log("error", error);
        }
        if(result){
          //console.log(result);
          instance.paymentResponse.set(result);
        }
    });

  });

});

Template.transaction.helpers({
  details: function(){
    
    //return Template.instance().paymentResponse.get();
  }
});

Template.transaction.events({
  "click #foo": function(event, template){

  }
});
