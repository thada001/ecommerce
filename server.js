var express = require('express');
var bodyParser = require('body-parser');
var mongojs = require('mongojs');

var app = express();
var db = mongojs('ecom', ['productList']);

app.use(express.static(__dirname+'/public'));
app.use(bodyParser.json());

app.post('/products', function(req, res) {
  db.productList.insert(req.body, function(err, results) {
    if (!err) {
      //console.log(results);
      res.status(200).end();
    }
  })
});

app.get('/products', function(req, res) {
  db.productList.find({}, function(err, results) {
    if (!err) {
      res.send(results);
      res.status(200).end();
    }
  })
})

app.get('/products/:id', function(req, res) {
  db.productList.findOne({_id: mongojs.ObjectId(req.params.id)}, function(err, results) {
    if (!err) {
      res.send(results);
      res.status(200).end();
    }
  })
})

app.put('/products/:id', function(req, res) {
  console.log(req.body);
  db.productList.update({ _id: mongojs.ObjectId(req.params.id)}, {$set: req.body}, function(err, results) {
    console.log(req.params);
    res.status(200).end();
  })
})

app.delete('/products/:id', function(req, res) {
  db.productList.remove({_id: mongojs.ObjectId(req.params.id)}, function(err, results) {
    if (!err) {
      console.log(results);
      res.status(200).end();
    }
  })
})

app.listen(8080, function() {
  console.log("listening on port 8080");
})
