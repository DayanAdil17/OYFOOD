-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 05, 2022 at 01:43 AM
-- Server version: 10.4.21-MariaDB
-- PHP Version: 8.0.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `oyfood`
--

-- --------------------------------------------------------

--
-- Table structure for table `active_order`
--

CREATE TABLE `active_order` (
  `order_id` int(255) NOT NULL,
  `order_user` varchar(100) NOT NULL,
  `order_table` int(255) NOT NULL,
  `order_menu_id` varchar(100) NOT NULL,
  `order_quantity` varchar(100) NOT NULL,
  `order_created` datetime NOT NULL DEFAULT current_timestamp(),
  `order_status` varchar(100) NOT NULL DEFAULT 'active'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `active_order`
--

INSERT INTO `active_order` (`order_id`, `order_user`, `order_table`, `order_menu_id`, `order_quantity`, `order_created`, `order_status`) VALUES
(47, 'Dayan', 1, ',1,2', ',2,1', '2022-05-05 04:32:48', 'done'),
(48, 'Aw', 4, ',1,2,3', ',3,4,8', '2022-05-05 04:33:00', 'done');

-- --------------------------------------------------------

--
-- Table structure for table `menu`
--

CREATE TABLE `menu` (
  `menu_id` int(100) NOT NULL,
  `menu_name` varchar(100) NOT NULL,
  `menu_price` int(100) NOT NULL,
  `menu_ordered` int(100) NOT NULL,
  `menu_duration` int(100) NOT NULL,
  `menu_discount` int(100) NOT NULL,
  `menu_status` varchar(100) NOT NULL,
  `menu_image` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `menu`
--

INSERT INTO `menu` (`menu_id`, `menu_name`, `menu_price`, `menu_ordered`, `menu_duration`, `menu_discount`, `menu_status`, `menu_image`) VALUES
(1, 'French Fries', 15000, 0, 600, 0, 'food', ''),
(2, 'Chicken Donburi', 25000, 0, 600, 0, 'food', ''),
(3, 'Summer Peach Tea', 20000, 0, 100, 0, 'drink', '');

-- --------------------------------------------------------

--
-- Table structure for table `resto_admin`
--

CREATE TABLE `resto_admin` (
  `resto_id` int(11) NOT NULL,
  `resto_username` varchar(100) NOT NULL,
  `resto_password` varchar(100) NOT NULL,
  `resto_email` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `resto_admin`
--

INSERT INTO `resto_admin` (`resto_id`, `resto_username`, `resto_password`, `resto_email`) VALUES
(1, 'oyfood', 'oyfood123', 'oyfood@gmail.com');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `active_order`
--
ALTER TABLE `active_order`
  ADD PRIMARY KEY (`order_id`);

--
-- Indexes for table `menu`
--
ALTER TABLE `menu`
  ADD PRIMARY KEY (`menu_id`);

--
-- Indexes for table `resto_admin`
--
ALTER TABLE `resto_admin`
  ADD PRIMARY KEY (`resto_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `active_order`
--
ALTER TABLE `active_order`
  MODIFY `order_id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=49;

--
-- AUTO_INCREMENT for table `menu`
--
ALTER TABLE `menu`
  MODIFY `menu_id` int(100) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `resto_admin`
--
ALTER TABLE `resto_admin`
  MODIFY `resto_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
