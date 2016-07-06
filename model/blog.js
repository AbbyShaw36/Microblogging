var extend = require("extend");

function Blog() {}

exports.Blog = Blog;

extend(Blog.prototype, {
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
	setComment : function(comment) {
		this.comment = comment;
	},
	getComment : function() {
		return this.comment;
	}
});
