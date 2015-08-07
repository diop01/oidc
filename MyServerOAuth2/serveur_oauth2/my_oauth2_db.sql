-- phpMyAdmin SQL Dump
-- version 4.1.14
-- http://www.phpmyadmin.net
--
-- Client :  127.0.0.1
-- Généré le :  Lun 29 Juin 2015 à 11:39
-- Version du serveur :  5.6.17-log
-- Version de PHP :  5.5.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Base de données :  `my_oauth2_db`
--

-- --------------------------------------------------------

--
-- Structure de la table `oauth_access_tokens`
--

CREATE TABLE IF NOT EXISTS `oauth_access_tokens` (
  `access_token` varchar(40) NOT NULL,
  `client_id` varchar(80) NOT NULL,
  `user_id` varchar(255) DEFAULT NULL,
  `expires` timestamp NOT NULL ON UPDATE CURRENT_TIMESTAMP,
  `scope` varchar(2000) DEFAULT NULL,
  PRIMARY KEY (`access_token`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Contenu de la table `oauth_access_tokens`
--

INSERT INTO `oauth_access_tokens` (`access_token`, `client_id`, `user_id`, `expires`, `scope`) VALUES
('798db84e6b0d8c3afca4b37af9c5a41b6e472cac', 'testclient1', 'mamadou', '2015-06-29 09:30:56', 'ami'),
('aa024b5b9b7c3cf23dfc9aaa2cb1290d6b0f0d6e', 'testclient1', 'mamadou', '2015-06-29 09:32:18', 'ami'),
('b98ea78749ac569651647b7e2f21be51c1fad11e', 'testclient1', 'mamadou', '2015-06-29 09:32:24', 'ami'),
('fb8bfbeb95b7fe8b359a36c8296def17374c1662', 'testclient1', 'mamadou', '2015-06-29 09:32:28', 'ami'),
('add4be4b1b7bb6f31e9a9114b29d9fd4c7c21c14', 'testclient1', 'mamadou', '2015-06-29 09:33:06', 'ami'),
('b4d012b14c110f524043bad3b3f6420472f20cc0', 'testclient1', 'mamadou', '2015-06-29 09:33:09', 'ami'),
('284d62c9fc3edf12a4037ab219a574c658f09f9e', 'testclient1', 'mamadou', '2015-06-29 09:34:04', 'ami'),
('87ad6b9398425ad5aee25b6c0771d2f64798bfee', 'testclient1', 'mamadou', '2015-06-24 13:37:10', 'ami'),
('6a042e2d5831106cc47e4c2d2444852a72417933', 'testclient1', 'mamadou', '2015-06-24 13:40:36', 'ami'),
('967e4a42378e6aba64fdca43b26bd320d8832f60', 'testclient1', 'mamadou', '2015-06-24 14:02:35', 'ami'),
('50f970886cd8c5d68a507e912a534af381c1351f', 'testclient1', 'mamadou', '2015-06-24 14:05:05', 'ami'),
('c873747114a513a4e74d3dcc0a9cc279ab6413ce', 'testclient1', 'mamadou', '2015-06-24 15:06:07', 'ami'),
('c77ca6d72c6f2576c933953c32fc80111221d490', 'testclient1', 'mamadou', '2015-06-24 15:27:16', 'ami'),
('4a4604bb924db81799affffc15ee635dc49c3fbb', 'testclient', 'mamadou', '2015-06-24 15:47:02', 'ami');

-- --------------------------------------------------------

--
-- Structure de la table `oauth_authorization_codes`
--

CREATE TABLE IF NOT EXISTS `oauth_authorization_codes` (
  `authorization_code` varchar(40) NOT NULL DEFAULT 'NOT NULL',
  `client_id` varchar(80) NOT NULL DEFAULT 'NOT NULL',
  `user_id` varchar(255) DEFAULT NULL,
  `redirect_uri` varchar(2000) DEFAULT NULL,
  `expires` timestamp NOT NULL ON UPDATE CURRENT_TIMESTAMP,
  `scope` varchar(2000) DEFAULT NULL,
  PRIMARY KEY (`authorization_code`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Contenu de la table `oauth_authorization_codes`
--

INSERT INTO `oauth_authorization_codes` (`authorization_code`, `client_id`, `user_id`, `redirect_uri`, `expires`, `scope`) VALUES
('testcode', 'testclient', NULL, NULL, '2015-06-29 22:00:00', NULL),
('testcode1', 'testclient1', NULL, NULL, '2015-06-29 22:00:00', NULL),
('password', 'testclient', NULL, NULL, '0000-00-00 00:00:00', NULL);

-- --------------------------------------------------------

--
-- Structure de la table `oauth_clients`
--

CREATE TABLE IF NOT EXISTS `oauth_clients` (
  `client_id` varchar(80) NOT NULL DEFAULT 'NOT NULL',
  `client_secret` varchar(80) NOT NULL,
  `redirect_uri` varchar(2000) NOT NULL,
  `grant_types` varchar(80) DEFAULT NULL,
  `scope` varchar(100) DEFAULT NULL,
  `user_id` varchar(80) DEFAULT NULL,
  PRIMARY KEY (`client_id`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Contenu de la table `oauth_clients`
--

INSERT INTO `oauth_clients` (`client_id`, `client_secret`, `redirect_uri`, `grant_types`, `scope`, `user_id`) VALUES
('testclient', 'testpass', '', 'password', 'ami', 'mamadou'),
('testclient1', 'testpass', '', 'password', 'ami', 'amy');

-- --------------------------------------------------------

--
-- Structure de la table `oauth_jwt`
--

CREATE TABLE IF NOT EXISTS `oauth_jwt` (
  `client_id` varchar(80) NOT NULL,
  `subject` varchar(80) DEFAULT NULL,
  `public_key` varchar(2000) DEFAULT NULL,
  PRIMARY KEY (`client_id`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Structure de la table `oauth_refresh_tokens`
--

CREATE TABLE IF NOT EXISTS `oauth_refresh_tokens` (
  `refresh_token` varchar(40) NOT NULL,
  `client_id` varchar(80) NOT NULL,
  `user_id` varchar(255) DEFAULT NULL,
  `expires` timestamp NOT NULL ON UPDATE CURRENT_TIMESTAMP,
  `scope` varchar(2000) DEFAULT NULL,
  PRIMARY KEY (`refresh_token`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Contenu de la table `oauth_refresh_tokens`
--

INSERT INTO `oauth_refresh_tokens` (`refresh_token`, `client_id`, `user_id`, `expires`, `scope`) VALUES
('ba23d65fa5854fb35f2156b5f34fca158e8c1f42', 'testclient1', 'mamadou', '2015-07-13 08:34:04', 'ami'),
('af7ad7dff05a69716778472d6521f3a2947f7fd1', 'testclient1', 'mamadou', '2015-07-13 08:33:09', 'ami'),
('c96c24a184fa520ba61a41fce31c86dec9bb7c55', 'testclient1', 'mamadou', '2015-07-13 08:33:06', 'ami'),
('e185da61e10d1c1dc2d09cf30385ff0932cf6f1a', 'testclient1', 'mamadou', '2015-07-13 08:32:28', 'ami'),
('2464ce9109be7857330192e9d678d0761a2728e0', 'testclient1', 'mamadou', '2015-07-13 08:32:24', 'ami'),
('71dc8ab13425b2fd78caf89d9bf86b0f66f167d8', 'testclient1', 'mamadou', '2015-07-13 08:32:18', 'ami'),
('63aa5876f89a10bc14da46f8e8747509df137280', 'testclient1', 'mamadou', '2015-07-13 08:30:56', 'ami'),
('dfe29c39241ad24b76c92d0f6ed3697e5c18b60c', 'testclient1', 'mamadou', '2015-07-10 13:27:44', 'ami'),
('33d3c41d1acd0e1ea1f8a30b8fa4b16be10a8194', 'testclient1', 'mamadou', '2015-07-10 15:33:24', 'ami'),
('49c1a90ea82b395a53dc9af374e9c1db5602e6e9', 'testclient1', 'mamadou', '2015-07-10 15:34:39', 'ami'),
('e6997643003c913a31201fb5eacd1b8fe0f2a960', 'testclient1', 'mamadou', '2015-07-10 15:38:32', 'ami'),
('e7ffb15116f552f7f789a3f96fe341b06afd6aae', 'testclient1', 'mamadou', '2015-07-10 15:39:14', 'ami'),
('c812d1fb16bf6f65da8f34bb44188412360a4e97', 'testclient1', 'mamadou', '2015-07-10 15:44:54', 'ami'),
('c39e0907110aa08d560f0816d60484363e52aae5', 'testclient1', 'mamadou', '2015-07-10 15:48:20', 'ami');

-- --------------------------------------------------------

--
-- Structure de la table `oauth_scopes`
--

CREATE TABLE IF NOT EXISTS `oauth_scopes` (
  `scope` text NOT NULL,
  `is_default` tinyint(4) DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Contenu de la table `oauth_scopes`
--

INSERT INTO `oauth_scopes` (`scope`, `is_default`) VALUES
('supportscope1', NULL),
('supportscope2', NULL),
('ami', NULL),
('profil', NULL),
('info', NULL);

-- --------------------------------------------------------

--
-- Structure de la table `oauth_users`
--

CREATE TABLE IF NOT EXISTS `oauth_users` (
  `username` varchar(255) NOT NULL,
  `password` varchar(2000) DEFAULT NULL,
  `first_name` varchar(255) DEFAULT NULL,
  `last_name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`username`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Contenu de la table `oauth_users`
--

INSERT INTO `oauth_users` (`username`, `password`, `first_name`, `last_name`) VALUES
('u', '51e69892ab49df85c6230ccc57f8e1d1606caccc', NULL, NULL),
('zeynab', '329529d41b3e34b09f9b78fb0f3e69bd2a7da22b', NULL, NULL),
('do', 'ac0b52a2ae6ef99999bc08fb31e19188bf0085a4614204068e677e140e1458be', NULL, NULL),
('mamadou', 'a1d0e80df7f90ab5cad313aa9235e4d0fb7a33303503e9f7966a55fc0d8c23e9', NULL, NULL),
('amy', '1906bc7c801f03c41551b06e2fd406e8f471787c51357e8731ec61dd599f04c8', NULL, NULL),
('d', '3c363836cf4e16666669a25da280a1865c2d2874', NULL, NULL),
('c', '84a516841ba77a5b4648de2cd0dfcb30ea46dbb4', NULL, NULL),
('diop', '891bfa35a3e5f2ff567048cd11e095e8e77ac636', NULL, NULL),
('e', '86f7e437faa5a7fce15d1ddcb9eaeaea377667b8', NULL, NULL),
('a', 'a', NULL, NULL),
('t', '8efd86fb78a56a5145ed7739dcb00c78581c5375', NULL, NULL);

-- --------------------------------------------------------

--
-- Structure de la table `ressources`
--

CREATE TABLE IF NOT EXISTS `ressources` (
  `login` varchar(50) NOT NULL,
  `amis` varchar(200) NOT NULL,
  `info` varchar(1500) NOT NULL,
  PRIMARY KEY (`login`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Contenu de la table `ressources`
--

INSERT INTO `ressources` (`login`, `amis`, `info`) VALUES
('mamadou', 'remy, ibrahima,donald', 'diop@gmail.com,\r\nCite Lebisey,\r\n14000 caen'),
('amy', 'Mamadou,Maguette', 'Dakar');

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
