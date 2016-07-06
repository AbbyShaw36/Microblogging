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
	setPassword : function(password) {
		this.password = password;
	},
	getPassword : function() {
		return this.password;
	},
	setBirthday : function(birthday) {
		this.birthday = birthday;
	},
	getBirthday : function() {
		return this.birthday;
	},
	setSex : function(sex) {
		this.sex = sex;
	},
	getSex : function() {
		return this.sex;
	},
	setEmail : function(email) {
		this.email = email;
	},
	getEmail : function() {
		return this.email;
	},
	setIntroduction : function(introduction) {
		this.introduction = introduction;
	},
	getIntroduction : function() {
		return this.introduction;
	},
	setHpPath : function(path) {
		this.hpPath = path;
	},
	getHpPath : function() {
		return this.hpPath;
	},
	setHp : function(file) {
		this.hp = file;
	},
	getHp : function() {
		return this.hp;
	},
	setBlog : function(blog) {
		this.blog = blog;
	},
	getBlog : function() {
		return this.blog;
	},
	setFollowing : function(following) {
		this.following = following;
	},
	getFollowing : function() {
		return this.following;
	},
	setFollower : function(follower) {
		this.follower = follower;
	},
	getFollower : function() {
		return this.follower;
	}
});