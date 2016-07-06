var extend = require("extend");

function Cookie() {}

exports.Cookie = Cookie;

extend(Cookie.prototype, {
	setKey : function (key) {
		this.key = key;
	},
	getKey : function () {
		return this.key;
	},
	setValue : function (value) {
		this.value = value;
	},
	getValue : function () {
		return this.value;
	},
	setPath : function (path) {
		this.path = path;
	},
	getPath : function () {
		return this.path;
	},
	setExdays : function (exdays) {
		this.exdays = exdays;
	},
	getExdays : function () {
		return this.exdays;
	},
	setMaxAge : function (maxAge) {
		this.maxAge = maxAge;
	},
	getMaxAge : function () {
		return this.maxAge;
	},
	setDomain : function (domain) {
		this.domain = domain;
	},
	getDomain : function () {
		return this.domain;
	},
	setHttpOnly : function (httpOnly) {
		this.httpOnly = httpOnly;
	},
	getHttpOnly : function () {
		return this.httpOnly;
	}
});

