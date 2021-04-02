"use strict";
var express = require('express'),
  bodyParser = require('body-parser'),
  fileServer = require('fs'),
  app = express(),
  customers = JSON.parse(fileServer.readFileSync('data/customers.json', 'utf-8')),
  states = JSON.parse(fileServer.readFileSync('data/states.json', 'utf-8'));

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(express.static(__dirname + '/dist/customer-management'));

/**
 * Returning the all the customers from "/data/customers.json
 */
app.get('/api/customers', (req, res) => {
  res.json(customers);
});


/**
 * Returning the specific customer based on given customer Id.
 */
app.get('/api/customers/:id', (req, res) => {
  let customerId = +req.params.id;
  let selectedCustomer = {};
  for (let customer of customers) {
    if (customer.id === customerId) {
      selectedCustomer = customer;
      break;
    }
  }
  res.json(selectedCustomer);
});

/**
 * Update the all the customers
 */
app.post('/api/customers', (req, res) => {
  let postedCustomer = req.body;
  let maxId = Math.max.apply(Math, customers.map((cust) => cust.id));
  postedCustomer.id = ++maxId;
  postedCustomer.gender = (postedCustomer.id % 2 === 0) ? 'female' : 'male';
  customers.push(postedCustomer);
  res.json(postedCustomer);
});

/**
 * Returning the all the states from "/data/states.json
 */
app.get('/api/states', (req, res) => {
  res.json(states);
});

/**
 * Update specific customer.
 */
app.put('/api/customers/:id', (req, res) => {
  let putCustomer = req.body;
  let id = +req.params.id;
  let status = false;

  //Ensure state name is in sync with state abbreviation
  const filteredStates = states.filter((state) => state.abbreviation === putCustomer.state.abbreviation);
  if (filteredStates && filteredStates.length) {
    putCustomer.state.name = filteredStates[0].name;
    console.log('Updated putCustomer state to ' + putCustomer.state.name);
  }

  for (let i = 0, len = customers.length; i < len; i++) {
    if (customers[i].id === id) {
      customers[i] = putCustomer;
      status = true;
      break;
    }
  }
  res.json({status: status});
});


/**
 * Delete the customer
 */
app.delete('/api/customers/:id', function (req, res) {
  let customerId = +req.params.id;
  for (let i = 0, len = customers.length; i < len; i++) {
    if (customers[i].id === customerId) {
      customers.splice(i, 1);
      break;
    }
  }
  res.json({status: true});
});

/**
 * Return the customers in limited pages.
 */
app.get('/api/customers/page/:skip/:top', (req, res) => {
  const topVal = req.params.top,
    skipVal = req.params.skip,
    skip = (isNaN(skipVal)) ? 0 : +skipVal;
  let top = (isNaN(topVal)) ? 10 : skip + (+topVal);

  if (top > customers.length) {
    top = skip + (customers.length - skip);
  }

  console.log(`Skip: ${skip} Top: ${top}`);

  var pagedCustomers = customers.slice(skip, top);
  res.setHeader('X-InlineCount', customers.length);
  res.json(pagedCustomers);
});

/**
 * Return the order from given order id.
 */
app.get('/api/orders/:id', function (req, res) {
  let customerId = +req.params.id;
  for (let cust of customers) {
    if (cust.customerId === customerId) {
      return res.json(cust);
    }
  }
  res.json([]);
});

/**
 * Redirect  all the unknown paths to home page the of the application.
 */
app.all('/*', function (req, res) {
  res.sendFile(__dirname + '/dist/customer-management/index.html');
});


// Running Express Js Server
app.listen(3000);
console.log('NodeJs Server listening on port 3000.');
var opn = require('opn');
opn('http://localhost:3000').then(() => {
  console.log('Browser has been closed.');
});


