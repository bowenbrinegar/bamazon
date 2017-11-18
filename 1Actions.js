var run = require('./0CLI.js');

var mysql = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'test',
  database : 'bamazon'
});

require('console.table');


var selector = function(sql, specific, boolean) {
	connection.query({
	  sql: sql,
	  timeout: 4000,
	  values: specific
	}, function (err, res, fields) {

		if (err) throw err;
		if (!boolean) {
			var arr = []
			for (var i = 0; i < res.length; i++) {
				arr.push(res[i])
			}
			console.table(arr);
			console.log('----------------');
		} else {
			console.log(`price: ${res[0].price}, quantity: ${temp_quantity}, sub-total: ${temp_quantity * res[0].price}`)
		}
	});
}

function value(sql, specific, ask_quantity) {
	 connection.query({
		  sql: sql,
		  values: [specific]
		}, function (err, res, fields) {
			if (err) throw err;
			fancyCallback(res[0].stock_quantity, ask_quantity, specific)
		});
}

function update(sql, specific) {
		connection.query({
			sql: sql,
		  timeout: 4000,
		  values: specific
		}, function(err, res) {
			if (err) throw err;
		});
}

function selectOne() {
		connection.query({
			sql: sql,
		  timeout: 4000,
		  values: specific
		}, function(err, res) {
			if (err) throw err;
		});
}

function fancyCallback(stock_quantity, ask_quantity, product) {
	if (stock_quantity > ask_quantity) {
		selector(`SELECT * FROM products WHERE item_id = ?`, product, false);
		var new_quantity = stock_quantity - ask_quantity;
		setTimeout(function() {
			new run.purchase(product, new_quantity);
		}, 1000)
	} else {
		console.log("not enough, try again")
	}
}


var temp_quantity = 0;

var Customer = function(product, quantity) {
	this.product = product;
	this.quantity = quantity;
	this.logger = function() {
		console.log(`product: ${this.product}
						 \nquantity: ${this.quantity}`)
	}
	this.list = function() {
		selector(`SELECT * FROM products`, null, false);
	}
	this.select = function() {
		value(`SELECT stock_quantity FROM products WHERE item_id = ?`, this.product, this.quantity)
		temp_quantity = this.quantity
	}
	this.purchase = function() {
		var arr = [{stock_quantity: quantity}, {item_id: product}];
		update(`UPDATE products SET ? WHERE ?`, arr);
		selector(`SELECT * FROM products WHERE ?`, arr, true);
	}
}

var Manager = function() {
	
}

var Supervisor = function() {
	
}


exports.customer = Customer;
exports.manager = Manager;
exports.supervisor = Supervisor;