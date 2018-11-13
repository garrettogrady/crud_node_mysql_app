-- phpMyAdmin SQL Dump
-- version 4.8.3
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Nov 14, 2018 at 12:41 AM
-- Server version: 10.1.36-MariaDB
-- PHP Version: 7.2.11

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `whatslit`
--

-- --------------------------------------------------------

--
-- Table structure for table `events`
--

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
(9, 'Test Event', '201 N Goodwin Ave', '11/09/2018', '14:40', 'Chill Sesh', 'Test Event.png', 1);

-- --------------------------------------------------------

--
-- Table structure for table `invited`
--

CREATE TABLE `invited` (
  `host_id` int(11) NOT NULL,
  `event_id` int(11) NOT NULL,
  `guest_id` int(11) NOT NULL,
  `checkedIn` bit(1) NOT NULL DEFAULT b'0'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `reviews`
--

CREATE TABLE `reviews` (
  `review_id` int(11) NOT NULL,
  `event` int(11) NOT NULL,
  `reviewee_id` int(11) DEFAULT NULL,
  `review_time` datetime DEFAULT NULL,
  `rating` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

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
(1, 'Garrett', 'OGrady', 'gogrady2@illinois.edu', 'password', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(2, 'bob', 'sagget', 'bob@test.com', 'pass', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(3, 'Josh', 'Smith', 'jsmith2@test.com', 'password', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(4, 'Josh', 'Smith', 'jsmith2@test.com', 'password', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(5, 'sdasd', 'asdad', 'asdasd', 'asdasd', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(6, 'Josh', 'Smith', 'j@test.com', 'password', '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(7, 'Rami', 'Karim', 'rkarim2@illinois.edu', 'password', '0000-00-00 00:00:00', '0000-00-00 00:00:00');

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
  ADD PRIMARY KEY (`host_id`,`event_id`,`guest_id`),
  ADD KEY `fk_event_id` (`event_id`),
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
  MODIFY `event_id` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `reviews`
--
ALTER TABLE `reviews`
  MODIFY `review_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

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
  ADD CONSTRAINT `fk_guest_id` FOREIGN KEY (`guest_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `fk_host_id` FOREIGN KEY (`host_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `reviews`
--
ALTER TABLE `reviews`
  ADD CONSTRAINT `fk_event` FOREIGN KEY (`event`) REFERENCES `events` (`event_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_reviewee` FOREIGN KEY (`reviewee_id`) REFERENCES `users` (`id`) ON DELETE SET NULL;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
