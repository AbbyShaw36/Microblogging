var extend = require("extend");

function Comment() {}

exports.Comment = Comment;

extend(Comment.prototype, {
	setId : function(id) {
		this.id = id;
	},
	getId : function() {
		return this.id;
	},
	setContent : function(content) {
		this.content = content;
	},
	getContent : function() {
		return this.content;
	},
	setPublisher : function(publisher) {
		this.publisher = publisher;
	},
	getPublisher : function() {
		return this.publisher;
	},
	setReceiver : function(receiver) {
		this.receiver = receiver;
	},
	getReceiver : function() {
		return this.receiver;
	},
	setBlogId : function(id) {
		this.blogId = id;
	},
	getBlogId : function() {
		return this.blogId;
	},
	setMessage : function(message) {
		this.message = message;
	},
	getMessage : function() {
		return this.message;
	}
});
