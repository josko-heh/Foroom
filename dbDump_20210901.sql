-- MySQL dump 10.13  Distrib 8.0.26, for Win64 (x86_64)
--
-- Host: localhost    Database: foroom
-- ------------------------------------------------------
-- Server version	8.0.26

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `categories`
--

DROP TABLE IF EXISTS `categories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `categories` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf16;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categories`
--

LOCK TABLES `categories` WRITE;
/*!40000 ALTER TABLE `categories` DISABLE KEYS */;
INSERT INTO `categories` VALUES (1,'Sport'),(2,'IT'),(3,'Music'),(4,'Dancing');
/*!40000 ALTER TABLE `categories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `comments`
--

DROP TABLE IF EXISTS `comments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `comments` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `content` varchar(1200) NOT NULL,
  `datetime` datetime DEFAULT NULL,
  `user_id` int NOT NULL,
  `thread_id` int unsigned NOT NULL,
  PRIMARY KEY (`id`),
  KEY `user_idx` (`user_id`),
  KEY `thread_idx` (`thread_id`),
  CONSTRAINT `thread` FOREIGN KEY (`thread_id`) REFERENCES `threads` (`id`),
  CONSTRAINT `user` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=43 DEFAULT CHARSET=utf16;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `comments`
--

LOCK TABLES `comments` WRITE;
/*!40000 ALTER TABLE `comments` DISABLE KEYS */;
INSERT INTO `comments` VALUES (2,'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Neque quidem repellendus ea? Eaque in explicabo quibusdam deleniti expedita, enim quidem debitis iusto ea iste incidunt voluptates vel autem quisquam ratione. Voluptatem nulla, nam error reprehenderit possimus commodi aliquid porro nesciunt consequatur velit quia numquam? Accusantium tempora sequi commodi. Vitae, ad.','2021-08-27 15:10:47',1,1),(3,'noviKOm','2021-08-27 16:05:52',1,2),(4,'toooootttt','2021-08-29 14:54:05',1,1),(13,'sed do eiusmod tempor incididunt ut labore et dolore magna aliqua','2020-02-05 16:19:41',4,1),(14,'Luctus venenatis lectus magna fringilla urna porttitor rhoncus dolor. Scelerisque fermentum dui faucibus in ornare quam viverra. Egestas sed sed risus pretium quam. Nisi scelerisque eu ultrices vitae auctor eu augue ut lectus. Duis convallis convallis tellus id interdum velit.','2021-07-10 09:41:43',8,1),(15,'Justo laoreet sit amet cursus sit amet dictum. Mattis ullamcorper velit sed ullamcorper morbi tincidunt.','2021-08-29 05:36:07',8,2),(16,'Pellentesque habitant morbi tristique senectus et netus et malesuada. Vitae aliquet nec ullamcorper sit amet risus.','2020-01-24 07:02:03',2,2),(17,'Nibh sed pulvinar proin gravida hendrerit. Sed augue lacus viverra vitae congue. Id diam maecenas ultricies mi eget. Dui ut ornare lectus sit amet est placerat. Faucibus pulvinar elementum integer enim neque volutpat ac. Dis parturient montes nascetur ridiculus mus mauris. Dignissim enim sit amet venenatis urna cursus.','2019-09-02 08:28:26',2,2),(18,'Lobortis mattis aliquam faucibus purus in massa tempor nec feugiat. Tellus orci ac auctor augue mauris augue neque gravida. ','2020-06-27 03:22:39',1,2),(19,'Non sodales neque sodales ut etiam sit. Tellus orci ac auctor augue mauris augue neque.','2019-10-07 00:34:33',1,2),(20,'Aliquam id diam maecenas ultricies mi eget mauris. Interdum velit euismod in pellentesque. Lacus suspendisse faucibus interdum posuere lorem ipsum dolor. Justo laoreet sit amet cursus sit amet dictum sit amet.','2019-09-10 01:51:24',2,3),(21,'Lorem ipsum dolor sit amet','2021-06-28 16:39:55',4,3),(22,'Consectetur adipiscing elit duis tristique sollicitudin nibh sit. Eleifend mi in nulla posuere sollicitudin. Blandit libero volutpat sed cras ornare arcu dui. Sed sed risus pretium quam vulputate dignissim suspendisse in est. In pellentesque massa placerat duis. Dolor morbi non arcu risus quis varius quam. Porttitor eget dolor morbi non arcu risus quis varius quam.','2020-09-20 14:51:58',8,3),(23,'Ipsum suspendisse ultrices gravida dictum fusce ut. Varius sit amet mattis vulputate enim nulla aliquet porttitor lacus. Nisi quis eleifend quam adipiscing vitae. Tempor orci dapibus ultrices in iaculis nunc. Enim sit amet venenatis urna cursus eget nunc scelerisque. Gravida cum sociis natoque penatibus.','2021-06-19 09:26:42',4,3),(24,'Lectus mauris ultrices eros in cursus turpis massa tincidunt dui. Facilisis volutpat est velit egestas dui id. Lectus quam id leo in vitae turpis massa. Ut tristique et egestas quis ipsum suspendisse ultrices.','2021-07-01 11:44:12',8,3),(25,'donec et odio pellentesque diam volutpat commodo sed egestas egestas fringilla phasellus faucibus scelerisque eleifend donec pretium vulputate sapien nec sagittis aliquam malesuada bibendum arcu vitae elementum curabitur vitae nunc','2021-06-06 15:27:27',8,4),(26,'viverra vitae congue eu consequat ac felis donec et odio','2020-12-28 02:11:15',1,4),(27,'Morbi a interdum metus. Donec velit enim, venenatis eu interdum nec, pharetra eu massa. Proin ac bibendum sem. Aliquam quis molestie felis. Suspendisse vel congue lacus. Vestibulum libero arcu, porta sed diam non, mollis molestie nisl. Etiam aliquam malesuada turpis.','2020-12-30 01:40:30',8,6),(28,'Tellus id interdum velit laoreet id donec ultrices tincidunt. Nisi vitae suscipit tellus mauris a diam maecenas. Faucibus scelerisque eleifend donec pretium vulputate sapien nec sagittis. Magna etiam tempor orci eu lobortis. Enim nec dui nunc mattis enim ut. Imperdiet nulla malesuada pellentesque elit eget gravida cum. Aliquet eget sit amet tellus cras adipiscing enim eu turpis. Elit duis tristique sollicitudin nibh sit amet commodo. Sed velit dignissim sodales ut eu sem.','2020-05-05 12:55:22',4,11),(29,'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Risus nec feugiat in fermentum posuere. Diam ut venenatis tellus in metus. Ac feugiat sed lectus vestibulum mattis. Aliquet nec ullamcorper sit amet risus nullam eget. Nibh sed pulvinar proin gravida hendrerit. ','2021-01-21 16:41:52',8,12),(30,'hendrerit','2020-08-06 10:49:52',8,12),(31,'Dui nunc mattis enim ut. Tincidunt lobortis feugiat vivamus at augue eget. Arcu dui vivamus arcu felis. Magna fringilla urna porttitor rhoncus dolor.','2020-02-23 09:10:20',2,12),(32,'sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.','2021-04-08 03:28:37',2,12),(33,'sapien','2020-03-27 18:58:43',1,13),(34,'Lacus laoreet non curabitur gravida arcu ac. Cras pulvinar mattis nunc sed blandit libero. Id aliquet risus feugiat in ante metus dictum at. Proin nibh nisl condimentum id venenatis a condimentum vitae. Tortor pretium viverra suspendisse potenti nullam ac tortor. Neque egestas congue quisque egestas. ','2019-09-19 02:34:20',1,13),(35,'Dui accumsan sit amet nulla facilisi. Lacus luctus accumsan tortor posuere ac ut consequat.','2020-03-12 09:02:07',2,10),(36,'labore et dolore ','2020-03-01 02:34:11',4,10),(37,'eleifend ','2020-07-26 20:51:07',8,10),(38,'Facilisis mauris sit amet massa vitae tortor condimentum lacinia quis. Sapien eget mi proin sed libero enim sed faucibus. A diam maecenas sed enim ut sem.','2020-09-07 06:39:38',4,8),(39,'Ut venenatis tellus in metus vulputate. Ornare aenean euismod elementum nisi quis eleifend quam.','2020-01-20 02:51:26',8,7),(40,'quam','2020-07-15 08:24:51',8,6),(41,' Aliquam faucibus purus in massa. Posuere urna nec tincidunt praesent.','2020-11-11 14:36:31',1,6),(42,'Et malesuada fames ac turpis egestas sed tempus urna.','2021-01-15 12:54:37',8,6);
/*!40000 ALTER TABLE `comments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `threads`
--

DROP TABLE IF EXISTS `threads`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `threads` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `title` varchar(100) NOT NULL,
  `datetime` datetime DEFAULT NULL,
  `user_id` int NOT NULL,
  `category_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `poster_idx` (`user_id`),
  KEY `category_ref_idx` (`category_id`) /*!80000 INVISIBLE */,
  CONSTRAINT `category_ref` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`),
  CONSTRAINT `poster` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf16;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `threads`
--

LOCK TABLES `threads` WRITE;
/*!40000 ALTER TABLE `threads` DISABLE KEYS */;
INSERT INTO `threads` VALUES (1,'OI','2021-08-25 16:58:19',1,1),(2,'Formula','2021-08-27 10:32:32',1,1),(3,'Harrold felt confident','2020-02-02 18:19:00',2,4),(4,'I\'m confused','2020-11-14 15:12:55',2,3),(5,'what\'s up','2020-06-05 08:14:08',1,1),(6,'Iguanas were falling','2019-11-09 00:38:33',4,2),(7,'trees','2020-04-27 16:36:56',8,4),(8,'Having no hair','2020-05-18 15:15:36',8,2),(9,'The fog','2021-04-06 11:33:47',8,1),(10,'Being unacquainted','2021-07-06 21:08:42',2,4),(11,'Chocolate covered crickets','2020-02-11 07:08:44',8,4),(12,'She cried diamonds.','2020-05-09 10:24:08',4,2),(13,'mind','2019-10-07 12:41:06',8,1);
/*!40000 ALTER TABLE `threads` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(255) NOT NULL,
  `password` varchar(60) NOT NULL,
  `name` varchar(75) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `auth_level` varchar(45) NOT NULL DEFAULT 'user',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf16;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--
-- username - pass
-- ognjen - 123
-- josko - 555
-- user123 - 123

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'ognjen','$2a$10$pjljRGV76qjeh2ZaxgLlqOYPiCnatjU/g3jEq2/GuQ9O8gkXhpDAe','Ognjen','og@ee.com','admin'),(2,'mirkkko','$2a$10$DuFYUUaGYi8p3WSbxotHpuM2/.yW4akD4QZCXngltccBWOXmcfVi.','Mirac','mm@ssm.com','user'),(4,'josko','$2a$10$A85Vo3Chbsh5dPOxcZzXbOnpu9J/7yAAQeX4ZoIukiyXrJ2WxzCoW','JOsko','jj@sf.com','user'),(8,'user123','$2a$10$ihGfHI1e2Lun.mXcFWQpqOwbzsy9b0D7I1dopumCwesDbMj6eMpFK','Ana','ana@g.com','user');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-09-01 12:14:07
