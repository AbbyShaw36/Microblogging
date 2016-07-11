DROP TABLE `user`;
CREATE TABLE IF NOT EXISTS `user` (
	`id` int(11) NOT NULL AUTO_INCREMENT,
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
	PRIMARY KEY (`id`),
	UNIQUE (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=UTF8;

DROP TABLE `follow`;
CREATE TABLE IF NOT EXISTS `follow` (
	`uId` int(11) NOT NULL,
	`fuId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=UTF8;

DROP TABLE `blogs`;
CREATE TABLE IF NOT EXISTS `blogs` (
	`id` int(11) NOT NULL AUTO_INCREMENT,
	`content` varchar(255) NOT NULL,
	`publishTime` bigint(20) NOT NULL,
	`publisher` int(11) NOT NULL,
	`comments` int(11) DEFAULT 0,
	PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=UTF8;

DROP TABLE `comments`;
CREATE TABLE IF NOT EXISTS `comments` (
	`id` int(11) NOT NULL AUTO_INCREMENT,
	`content` varchar(255) NOT NULL,
	`publishTime` bigint(20) NOT NULL,
	`publisher` int(11) NOT NULL,
	`receiver` int(11) NOT NULL,
	`ceceived` ENUM('0', '1') DEFAULT '0',
	`messages` int(11) DEFAULT 0,
	`blogId` int(11) NOT NULL,
	PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=UTF8;

DROP TABLE `messages`;
CREATE TABLE IF NOT EXISTS `messages` (
	`id` int(11) NOT NULL AUTO_INCREMENT,
	`content` varchar(255) NOT NULL,
	`publishTime` bigint(20) NOT NULL,
	`publisher` int(11) NOT NULL,
	`receiver` int(11) NOT NULL,
	`received` ENUM('0','1') DEFAULT '0',
	`commentId` int(11) NOT NULL,
	PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=UTF8;