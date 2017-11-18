var inquirer = require('inquirer');

var run = require('./1Actions.js');


var Manager = run.manager;
var Supervisor = run.supervisor;


function prompt() {
		inquirer.prompt({
				type: "list",
				message: "What are you?",
				name: "choices",
				choices: ["Customer", "Manager", "Supervisor", "Exit"]
		}).then(function(res) {
				switch (res.choices) 
							{
							    case "Customer":
							    		console.log("costumer")
							    		runCustomer();
							        break;
							    case "Manager":
							    		console.log("manager")
							        break;
							    case "Supervisor":
							    		console.log("supervisor")
							        break;
							    case "Exit":
							    		console.log("Bye!")
							        break;
							    default:
							    		break;
							 }
		});
}

prompt();


function runCustomer() {
	var Customer = new run.customer(null, null);
		Customer.list()
		setTimeout(customerPrompt, 1000)
	function customerPrompt() {
		inquirer.prompt([
			{
				type: "input",
				message: "What product would you like to buy (ID)",
				name: "product",
			},
			{
				type: "input",
				message: "How many would you like?",
				name: "quantity",
			}
		]).then(function(res) {
			var Customer = new run.customer(res.product, res.quantity);
			Customer.select();
		});
	}	
}


var runPurchase = function(product, quantity) {
	inquirer.prompt({
				type: "list",
				message: "Would you like to Purchase the Product?",
				name: "choices",
				choices: ["YES", "NO", "Exit"]
		}).then(function(res) {
			switch (res.choices) 
							{
							    case "YES":
							    		var Customer = new run.customer(product, quantity);
												Customer.purchase();
													console.log(`purchase of item #${product} successful`)
												setTimeout(prompt, 1000);
							        break;
							    case "NO":
							    			setTimeout(runCustomer, 1000)
							        break;
							    case "Exit":
							    				console.log("bye!")
							        break;
							    default:
							    		break;
							 }
		});
}

exports.purchase = runPurchase;
