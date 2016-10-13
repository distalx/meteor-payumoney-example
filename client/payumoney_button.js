import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import { Random } from 'meteor/random';
import './payumoney_button.html';

Template.payumoneyButton.onCreated(function payumoneyButtonCreated() {

  var instance = this;
  instance.amount = new ReactiveVar(this.data.cart.total.amount);
  instance.txnid = new ReactiveVar(Random.secret());
  instance.productinfo = new ReactiveVar('lorem ipsum');
  instance.phone = new ReactiveVar(this.data.cart.user.mobile);
  instance.firstname = new ReactiveVar(this.data.cart.user.name);
  instance.email = new ReactiveVar(this.data.cart.user.email);
  instance.service_provider = new ReactiveVar("payu_paisa");
  instance.hash = new ReactiveVar();


  this.autorun(() => {
    var data = {
      txnid: instance.txnid.get(),
      amount: instance.amount.get(),
      productinfo: instance.productinfo.get(),
      firstname: instance.firstname.get(),
      email: instance.email.get()
    }

    Meteor.call('processPayment',data ,function(error, result) {
        if(error){
          console.log("error", error);
        }
        if(result){
          //console.log(result);
          instance.hash.set(result);
        }
    });

  });
});

Template.payumoneyButton.onRendered(function(){

});
Template.payumoneyButton.helpers({
  key:function(){
      return Meteor.settings.public.payu_key;
  },
  txnid:function(){
      return Template.instance().txnid.get();
  },
  amount:function(){
      return Template.instance().amount.get();
  },

  productinfo:function(){
      return Template.instance().productinfo.get();
  },

  firstname:function(){
      return Template.instance().firstname.get();
  },
  phone:function(){
      return Template.instance().phone.get();
  },
  email:function(){
      return Template.instance().email.get();
  },
  surl:function(){
      return Meteor.absoluteUrl("transaction/"+ Template.instance().txnid.get());
  },
  furl:function(){
      return Meteor.absoluteUrl("transaction/"+ Template.instance().txnid.get());
  },
  service_provider:function(){
      return Template.instance().service_provider.get();
  },
  hash:function(){
      return Template.instance().hash.get();
  }
});
