-- phpMyAdmin SQL Dump
-- version 4.8.3
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Dec 03, 2018 at 07:01 AM
-- Server version: 10.1.36-MariaDB
-- PHP Version: 7.2.11

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";

CREATE TABLE `events` (
  `event_id` int(5) NOT NULL,
  `event_name` varchar(255) NOT NULL,
  `event_address` varchar(255) NOT NULL,
  `event_date` varchar(255) NOT NULL,
  `event_time` varchar(255) NOT NULL,
  `event_level` varchar(255) NOT NULL,
  `image` varchar(255) NOT NULL,
  `host_id` int(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `events`
--

INSERT INTO `events` (`event_id`, `event_name`, `event_address`, `event_date`, `event_time`, `event_level`, `image`, `host_id`) VALUES
(6, 'Thanksgiving Fest', '399 Greentree Lane Northeast', '11/01/2018', '22:24', 'Absolute Rager', 'Halloween Fest.png', 1),
(7, 'Demoing this App', '1023 W Green St.', '11/16/2018', '16:38', 'Chill Sesh', 'Demoing this App.png', 6),
(8, 'Ramis Party', '1234 Springfield Ave', '11/07/2018', '15:57', 'Chill Sesh', 'Ramis Party.png', 7),
(9, 'Test Event', '201 N Goodwin Ave', '11/09/2018', '14:40', 'Chill Sesh', 'Test Event.png', 1),
(10, 'Fun Times', '399 Greentree Lane Northeast', '11/02/2018', '13:00', 'Very Lit', 'Fun Times.jpeg', 1),
(11, 'Halloween Feste', '399 Greentree Lane Northeast', '11/16/2018', '13:01', 'Very Lit', 'Halloween Feste.jpeg', 1),
(13, 'Halloween Fest2131', '399 Greentree Lane Northeast', '11/02/2018', '13:05', 'Very Lit', 'Halloween Fest2131.jpeg', 1),
(14, 'Jennas Party', '1010 Drury Lane', '11/15/2018', '17:38', 'Very Lit', 'Jennas Party.jpeg', 1),
(15, 'Testing', '399 Greentree Lane Northeast', '11/02/2018', '22:24', 'Very Lit', 'Testing.png', 1),
(16, 'Ramis party', '1010 hype lane', '12/09/2018', '17:33', 'Very Lit', 'Ramis Shindig.png', 1),
(17, 'Hi', '1231 fry lane', '11/30/2018', '17:36', 'Absolute Rager', 'Hi.png', 1),
(18, 'add 2', '399 greentree', '11/14/2018', '17:37', 'Very Lit', 'add 2.png', 1),
(20, 'Party', '399 Greentree', '12/01/2018', '18:49', 'undefined', 'Party.png', 1),
(21, 'garto', 'this', '12/01/2018', '18:49', 'undefined', 'garto.png', 1),
(22, 'asdasd', '399 greentree', 'asdasd', '18:50', 'Very Lit', 'asdasd.jpeg', 1);

-- --------------------------------------------------------

--
-- Stand-in structure for view `event_rating`
-- (See below for the actual view)
--
CREATE TABLE `event_rating` (
`event` int(11)
,`count(*)` bigint(21)
,`AVG(rating)` decimal(14,4)
);

-- --------------------------------------------------------

--
-- Table structure for table `invited`
--

CREATE TABLE `invited` (
  `event_id` int(11) NOT NULL,
  `guest_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `invited`
--

INSERT INTO `invited` (`event_id`, `guest_id`) VALUES
(14, 2),
(14, 6),
(15, 1),
(15, 3),
(15, 7),
(16, 2),
(16, 3),
(16, 7),
(17, 2),
(17, 3),
(17, 7),
(18, 2),
(18, 3),
(18, 7),
(20, 2),
(20, 6),
(22, 5);

-- --------------------------------------------------------

--
-- Table structure for table `reviews`
--

CREATE TABLE `reviews` (
  `review_id` int(11) NOT NULL,
  `event` int(11) NOT NULL,
  `reviewee_id` int(11) DEFAULT NULL,
  `review_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `rating` int(11) DEFAULT NULL,
  `comment` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `reviews`
--

INSERT INTO `reviews` (`review_id`, `event`, `reviewee_id`, `review_time`, `rating`, `comment`) VALUES
(2, 14, 6, '2018-11-26 21:03:35', 3, 'great party'),
(3, 15, 1, '2018-11-29 23:36:05', 5, 'fun time');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `first_name` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `last_name` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `email` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `password` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `created` datetime NOT NULL,
  `modified` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `first_name`, `last_name`, `email`, `password`, `created`, `modified`) VALUES
(1, 'Garrett', 'OGrady', 'gogrady2@illinois.edu', '$2b$10$tcp3gNqAXdym6E1NThnuU.TyZz4UC8eqv7XJjn2WL36Ff6mXxOLlK', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(2, 'bob', 'sagget', 'bob@test.com', 'pass', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(3, 'Josh', 'Smith', 'jsmith2@test.com', 'password', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(4, 'Josh', 'Smith', 'jsmith2@test.com', 'password', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(5, 'sdasd', 'asdad', 'asdasd', 'asdasd', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(6, 'Josh', 'Smith', 'j@test.com', 'password', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(7, 'Rami', 'Karim', 'rkarim2@illinois.edu', 'password', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(8, 'garrett', 'ogrady', 'garrett@yo.com', '$2b$10$qWamk0ji3k.uXso1wuoftuwpK6l7P/QSno50Kbzwu9GT.up0fjNc6', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(9, 'Hello', 'Ogrady', 'gartogo@go.com', '$2b$10$tcp3gNqAXdym6E1NThnuU.TyZz4UC8eqv7XJjn2WL36Ff6mXxOLlK', '0000-00-00 00:00:00', '0000-00-00 00:00:00');

-- --------------------------------------------------------

--
-- Structure for view `event_rating`
--
DROP TABLE IF EXISTS `event_rating`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `event_rating`  AS  select `reviews`.`event` AS `event`,count(0) AS `count(*)`,avg(`reviews`.`rating`) AS `AVG(rating)` from `reviews` group by `reviews`.`event` ;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `events`
--
ALTER TABLE `events`
  ADD PRIMARY KEY (`event_id`),
  ADD KEY `host_id` (`host_id`);

--
-- Indexes for table `invited`
--
ALTER TABLE `invited`
  ADD PRIMARY KEY (`event_id`,`guest_id`),
  ADD KEY `fk_guest_id` (`guest_id`);

--
-- Indexes for table `reviews`
--
ALTER TABLE `reviews`
  ADD PRIMARY KEY (`review_id`),
  ADD KEY `fk_reviewee` (`reviewee_id`),
  ADD KEY `fk_event` (`event`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `events`
--
ALTER TABLE `events`
  MODIFY `event_id` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- AUTO_INCREMENT for table `reviews`
--
ALTER TABLE `reviews`
  MODIFY `review_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `events`
--
ALTER TABLE `events`
  ADD CONSTRAINT `host_event_relation` FOREIGN KEY (`host_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `invited`
--
ALTER TABLE `invited`
  ADD CONSTRAINT `fk_event_id` FOREIGN KEY (`event_id`) REFERENCES `events` (`event_id`) ON DELETE CASCADE,
  ADD CONSTRAINT `fk_guest_id` FOREIGN KEY (`guest_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `reviews`
--
ALTER TABLE `reviews`
  ADD CONSTRAINT `fk_event` FOREIGN KEY (`event`) REFERENCES `events` (`event_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_reviewee` FOREIGN KEY (`reviewee_id`) REFERENCES `users` (`id`) ON DELETE SET NULL;
COMMIT;
