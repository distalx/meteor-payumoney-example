var bodyParser = require('body-parser');

Picker.middleware(bodyParser.json());// this depends on response type


Picker.route('/cb/payment_success/', function(params, req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*'); //payu origin url
  res.setHeader('Access-Control-Allow-Methods', 'PUT');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  console.log(req.body);

});

Picker.route('/cb/payment_fail/', function(params, req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*'); //payu origin url
  res.setHeader('Access-Control-Allow-Methods', 'PUT');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  console.log(req.body);
});
