var extend = require("extend");

function Message() {}

exports.Message = Message;

extend(Message.prototype, {
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
	setCommentId : function(commentId) {
		this.commentId = commentId;
	},
	getCommentId : function () {
		return this.commentId;
	}
});

