var extend = require("extend");

function User() {}

exports.User = User;

extend(User.prototype, {
	setId : function(id) {
		this.id = id;
	},
	getId : function() {
		return this.id;
	},
	setName : function(name) {
		this.name = name;
	},
	getName : function() {
		return this.name;
	},
	setAge : function(age) {
		this.age = age;
	},
	getAge : function() {
		return this.age;
	},
	setSex : function(sex) {
		this.sex = sex;
	},
	getSex : function() {
		return this.sex;
	},
	setPassword : function(password) {
		this.password = password;
	},
	getPassword : function() {
		return this.password;
	},
	setEmail : function(email) {
		this.email = email;
	},
	getEmail : function() {
		return this.email;
	}
});