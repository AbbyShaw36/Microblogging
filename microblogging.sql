DROP TABLE `user`;
CREATE TABLE IF NOT EXISTS `user` (
	`userId` int(11) NOT NULL AUTO_INCREMENT,
	`name` varchar(255) NOT NULL,
	`password` varchar(40) NOT NULL,
	`age` int(11) DEFAULT NULL,
	`sex` int(1) DEFAULT NULL,
	`email` varchar(255) DEFAULT NULL,
	`blogs` int(11) DEFAULT 0,
	PRIMARY KEY (`userId`),
	UNIQUE (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=UTF8;