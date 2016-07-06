DROP TABLE `user`;
CREATE TABLE IF NOT EXISTS `user` (
	`userId` int(11) NOT NULL AUTO_INCREMENT,
	`name` varchar(255) NOT NULL,
	`password` varchar(40) NOT NULL,
	`birthday` bigint(20) DEFAULT NULL,
	`sex` int(1) DEFAULT NULL,
	`email` varchar(255) DEFAULT NULL,
	`introduction` varchar(255) DEFAULT NULL,
	`hpPath` varchar(255) DEFAULT NULL,
	`hp` varchar(255) DEFAULT NULL,
	`blogs` int(11) DEFAULT 0,
	`followings` int(11) DEFAULT 0,
	`followers` int(11) DEFAULT 0,
	PRIMARY KEY (`userId`),
	UNIQUE (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=UTF8;

DROP TABLE `follow`;
CREATE TABLE IF NOT EXISTS `follow` (
	`uId` int(11) NOT NULL,
	`fuId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=UTF8;

DROP TABLE `blogs`;
CREATE TABLE IF NOT EXISTS `blogs` (
	`blogId` int(11) NOT NULL AUTO_INCREMENT,
	`blogContent` varchar(255) NOT NULL,
	`blogPublishTime` bigint(20) NOT NULL,
	`blogPublisher` int(11) NOT NULL,
	`comments` int(11) DEFAULT 0,
	PRIMARY KEY (`blogId`)
) ENGINE=InnoDB DEFAULT CHARSET=UTF8;

DROP TABLE `comments`;
CREATE TABLE IF NOT EXISTS `comments` (
	`commentId` int(11) NOT NULL AUTO_INCREMENT,
	`commentContent` varchar(255) NOT NULL,
	`commentPublishTime` bigint(20) NOT NULL,
	`commentPublisher` int(11) NOT NULL,
	`commentReceiver` int(11) NOT NULL,
	`commentReceived` ENUM('0', '1') DEFAULT '0',
	`messages` int(11) DEFAULT 0,
	`blogId` int(11) NOT NULL,
	PRIMARY KEY (`commentId`)
) ENGINE=InnoDB DEFAULT CHARSET=UTF8;

DROP TABLE `messages`;
CREATE TABLE IF NOT EXISTS `messages` (
	`messageId` int(11) NOT NULL AUTO_INCREMENT,
	`messageContent` varchar(255) NOT NULL,
	`messagePublishTime` bigint(20) NOT NULL,
	`messagePublisher` int(11) NOT NULL,
	`messageReceiver` int(11) NOT NULL,
	`messageReceived` ENUM('0','1') DEFAULT '0',
	`commentId` int(11) NOT NULL,
	PRIMARY KEY (`messageId`)
) ENGINE=InnoDB DEFAULT CHARSET=UTF8;