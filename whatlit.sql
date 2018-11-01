CREATE DATABASE whatslit;

CREATE TABLE `events` (
  `event_id` int(5) NOT NULL AUTO_INCREMENT,
  `event_name` varchar(255) NOT NULL,
  `event_address` varchar(255) NOT NULL,
  `event_date` varchar(255) NOT NULL,
  `event_time` varchar(255) NOT NULL,
  `event_level` varchar(255) NOT NULL,
  `image` varchar(255) NOT NULL,
  `host_username` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;



CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `first_name` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `last_name` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `email` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `password` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `created` datetime NOT NULL,
  `modified` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
