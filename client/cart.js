import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';


import './cart.html';

var carts = [ {
    items: [
      { name : 'cola', price: 2 , qty: 3},
      { name : 'pepsi', price: 1 , qty: 2}
    ],
    user: {
      email: 'ron@example.com',
      name: 'Ron',
      mobile: '1111111111'
    },
    total: {
      items: 5,
      amount: 8
    }
  },
];

Template.cart.helpers({
  cart: function(){
    return carts;
  }
});

Template.cart.events({
  "click #foo": function(event, template){

  }
});
