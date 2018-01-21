-- phpMyAdmin SQL Dump
-- version 4.5.4.1deb2ubuntu2
-- http://www.phpmyadmin.net
--
-- Máy chủ: localhost
-- Thời gian đã tạo: Th12 31, 2017 lúc 02:52 PM
-- Phiên bản máy phục vụ: 5.7.20-0ubuntu0.16.04.1
-- Phiên bản PHP: 7.0.22-0ubuntu0.16.04.1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Cơ sở dữ liệu: `project_Todo`
--

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `todos`
--

CREATE TABLE `todos` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `created` datetime NOT NULL,
  `done` int(11) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `email` char(60) NOT NULL,
  `password` char(100) NOT NULL,
  `fullname` varchar(60) NOT NULL,
  `role` int(11) NOT NULL,
  `status` int(11) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Đang đổ dữ liệu cho bảng `users`
--

INSERT INTO `users` (`id`, `email`, `password`, `fullname`, `role`, `status`) VALUES
(1, 'admin@gmail.com', '$2a$10$q5kjpqSJ1iY4ZdBAo8Z0NOJ7FrBirlEKaxWN5eE3IbSrHvU8wB6ui', 'Tịnh Phan', 1, 1),
(2, 'admin1@gmail.com', '$2a$10$gGg7BpbVjvDJa90NGgtE5.J4zXfXX55m4cN1Ol2rkS4Rhp1pP.8zO', 'df ', 2, 1),
(5, 'admin2@gmail.com', '$2a$10$JrGv1UQGCy.REaIhXohMce58ayRj7A5tkLyeo7kQ3xRs/v/d0k3Tu', 'df ', 2, 0),
(6, 'admin3@gmail.com', '$2a$10$cP35ZQnbeAiY3lbfee9oaewNk5RIyOEDUOhz8VRY05F3UO3THcATG', 'df ', 2, 0),
(7, 'admin4@gmail.com', '$2a$10$8h64lV6U/lDdC45.RVHuY.ejWqO8qLTNHsNcctpRsBhdA.3/qSVsO', 'df ', 2, 0),
(8, 'admins4@gmail.com', '$2a$10$SIaWLAjj1brtrE9mY9BchO2PeTZc1rSqAd7WlxFcXuQ96afWP3lOi', 'df ', 2, 0),
(14, 'pvtinh1996@gmail.com', '$2a$10$NTnz0YzK5q/c8rgQvacHvuJbYSvfxoHoQzyX.3cnqmzFDL4A.6g46', 'Tịnh Jr', 2, 1);

--
-- Chỉ mục cho các bảng đã đổ
--

--
-- Chỉ mục cho bảng `todos`
--
ALTER TABLE `todos`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- Chỉ mục cho bảng `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT cho các bảng đã đổ
--

--
-- AUTO_INCREMENT cho bảng `todos`
--
ALTER TABLE `todos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT cho bảng `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
