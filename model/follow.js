var extend = require("extend");

function Follow() {}

exports.Follow = Follow;

extend(Follow.prototype, {
	setUId : function(id) {
		this.uId = id;
	},
	getUId : function() {
		return this.uId;
	},
	setFuId : function(id) {
		this.fuId = id;
	},
	getFuId : function() {
		return this.fuId;
	}
});