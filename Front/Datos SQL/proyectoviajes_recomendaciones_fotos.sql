-- MySQL dump 10.13  Distrib 8.0.31, for Win64 (x86_64)
--
-- Host: localhost    Database: proyectoviajes
-- ------------------------------------------------------
-- Server version	8.0.31

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `recomendaciones_fotos`
--

DROP TABLE IF EXISTS `recomendaciones_fotos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `recomendaciones_fotos` (
  `id` int NOT NULL AUTO_INCREMENT,
  `foto` varchar(64) NOT NULL,
  `created_at` datetime NOT NULL,
  `recomendacion_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `recomendacion_id` (`recomendacion_id`),
  CONSTRAINT `recomendaciones_fotos_ibfk_1` FOREIGN KEY (`recomendacion_id`) REFERENCES `recomendaciones` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `recomendaciones_fotos`
--

LOCK TABLES `recomendaciones_fotos` WRITE;
/*!40000 ALTER TABLE `recomendaciones_fotos` DISABLE KEYS */;
INSERT INTO `recomendaciones_fotos` VALUES (7,'407ab33c-c0c3-45a9-b5e8-5b7101eb308b.jpg','2023-02-23 15:47:27',31),(8,'1d2f8813-6165-4e9e-bdfc-fb1653325ceb.jpg','2023-02-23 15:17:58',32),(9,'3ce391fb-1f67-4ad2-9c38-a27594b95098.jpg','2023-02-23 19:40:54',33);
/*!40000 ALTER TABLE `recomendaciones_fotos` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-02-23 22:52:44
