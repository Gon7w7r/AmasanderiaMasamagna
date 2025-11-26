CREATE DATABASE  IF NOT EXISTS `db_amasanderia` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci */;
USE `db_amasanderia`;
-- MySQL dump 10.13  Distrib 8.0.42, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: db_amasanderia
-- ------------------------------------------------------
-- Server version	5.5.5-10.4.32-MariaDB

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
-- Table structure for table `boletas`
--

DROP TABLE IF EXISTS `boletas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `boletas` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `direccion_usuario` varchar(255) NOT NULL,
  `email_usuario` varchar(255) NOT NULL,
  `fecha_creacion` datetime(6) NOT NULL,
  `iva` double NOT NULL,
  `monto_final` double NOT NULL,
  `subtotal` double NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `boletas`
--

LOCK TABLES `boletas` WRITE;
/*!40000 ALTER TABLE `boletas` DISABLE KEYS */;
INSERT INTO `boletas` VALUES (1,'Alaska 1371','gonzalonav@duoc.cl','2025-11-21 20:36:09.000000',15200,95200,80000),(2,'Alaska 1371','gonzalonav@duoc.cl','2025-11-21 20:37:54.000000',11400,71400,60000);
/*!40000 ALTER TABLE `boletas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `carritos`
--

DROP TABLE IF EXISTS `carritos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `carritos` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `estado` varchar(255) DEFAULT NULL,
  `fecha_actualizacion` datetime(6) DEFAULT NULL,
  `fecha_creacion` datetime(6) DEFAULT NULL,
  `usuario_rut` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK44pat0do7tr1l7tu405lof4vj` (`usuario_rut`),
  CONSTRAINT `FK44pat0do7tr1l7tu405lof4vj` FOREIGN KEY (`usuario_rut`) REFERENCES `usuarios` (`rut`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `carritos`
--

LOCK TABLES `carritos` WRITE;
/*!40000 ALTER TABLE `carritos` DISABLE KEYS */;
INSERT INTO `carritos` VALUES (1,'procesado','2025-11-19 13:35:06.000000','2025-11-19 13:35:06.000000','21861087'),(2,'procesado','2025-11-19 13:47:18.000000','2025-11-19 13:47:18.000000','21861087'),(3,'procesado','2025-11-19 13:47:30.000000','2025-11-19 13:47:30.000000','21861087'),(4,'activo','2025-11-19 13:49:38.000000','2025-11-19 13:49:38.000000','219874189'),(5,'inactivo','2025-11-19 14:27:13.000000','2025-11-19 14:18:01.000000','21861087'),(6,'procesado','2025-11-19 14:27:43.000000','2025-11-19 14:27:43.000000','21861087'),(7,'procesado','2025-11-21 20:37:43.000000','2025-11-21 20:37:43.000000','21861087'),(8,'activo','2025-11-21 20:37:57.000000','2025-11-21 20:37:57.000000','21861087');
/*!40000 ALTER TABLE `carritos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `detalles_boleta`
--

DROP TABLE IF EXISTS `detalles_boleta`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `detalles_boleta` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `cantidad` int(11) NOT NULL,
  `precio_unitario` double NOT NULL,
  `boleta_id` bigint(20) NOT NULL,
  `producto_id` bigint(20) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FKfr33d8hf1hg7fbemopgkvitqo` (`boleta_id`),
  KEY `FK3cyy520w4m0i1im9kpwxfotac` (`producto_id`),
  CONSTRAINT `FK3cyy520w4m0i1im9kpwxfotac` FOREIGN KEY (`producto_id`) REFERENCES `productos` (`id`),
  CONSTRAINT `FKfr33d8hf1hg7fbemopgkvitqo` FOREIGN KEY (`boleta_id`) REFERENCES `boletas` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `detalles_boleta`
--

LOCK TABLES `detalles_boleta` WRITE;
/*!40000 ALTER TABLE `detalles_boleta` DISABLE KEYS */;
INSERT INTO `detalles_boleta` VALUES (1,4,20000,1,2),(2,3,20000,2,2);
/*!40000 ALTER TABLE `detalles_boleta` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `items_carrito`
--

DROP TABLE IF EXISTS `items_carrito`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `items_carrito` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `cantidad` int(11) NOT NULL,
  `precio_unitario` double NOT NULL,
  `carrito_id` bigint(20) DEFAULT NULL,
  `producto_id` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK9qal2jfqtv8ek5uelns6o4cn1` (`carrito_id`),
  KEY `FKscnkqsnxj0ppo0bcyw6u13a82` (`producto_id`),
  CONSTRAINT `FK9qal2jfqtv8ek5uelns6o4cn1` FOREIGN KEY (`carrito_id`) REFERENCES `carritos` (`id`),
  CONSTRAINT `FKscnkqsnxj0ppo0bcyw6u13a82` FOREIGN KEY (`producto_id`) REFERENCES `productos` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=44 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `items_carrito`
--

LOCK TABLES `items_carrito` WRITE;
/*!40000 ALTER TABLE `items_carrito` DISABLE KEYS */;
INSERT INTO `items_carrito` VALUES (2,2,500,1,13),(3,1,500,2,13),(41,20,500,3,13),(42,4,20000,6,2),(43,3,20000,7,2);
/*!40000 ALTER TABLE `items_carrito` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `productos`
--

DROP TABLE IF EXISTS `productos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `productos` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `categoria` varchar(255) DEFAULT NULL,
  `descripcion` varchar(255) DEFAULT NULL,
  `estado` bit(1) DEFAULT NULL,
  `fecha_creacion` datetime(6) DEFAULT NULL,
  `imagen_url` varchar(255) DEFAULT NULL,
  `nombre` varchar(255) DEFAULT NULL,
  `precio` int(11) NOT NULL,
  `stock` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `productos`
--

LOCK TABLES `productos` WRITE;
/*!40000 ALTER TABLE `productos` DISABLE KEYS */;
INSERT INTO `productos` VALUES (1,'torta','Chococale con manjar',_binary '','2025-10-26 22:15:11.000000','/public/images/torta.jpg','Torta Chocolate',25000,10),(2,'torta','Bizcocho de frutilla con manjar',_binary '','2025-10-26 22:19:18.000000','/public/images/torta1.jpg','Torta de Bizcocho y Crema',20000,43),(3,'pie','Limón y leche condensada',_binary '','2025-10-26 22:20:59.000000','/public/images/torta4.jpg','Pie de Limón',17000,6),(4,'pan','Con almendras',_binary '','2025-10-26 22:54:53.000000','/public/images/pan1.jpg','Pan de Pascua',5000,25),(5,'masa','Masa de 1.5 centímetros de grosor.\nComprar por 10 unidades.',_binary '','2025-10-26 22:58:03.000000','/public/images/masa2.jpg','Sopaipilla',1500,40),(6,'pan','Masa de hallulla con forma de calabaza (ambientado en Halloween).\nSe vende por kilo.',_binary '','2025-10-26 22:59:40.000000','/public/images/pan2.jpg','Pan de Calabaza',1800,28),(8,'pan','Pan de 20 centímetros.\nSe vende cada 5 unidades.',_binary '','2025-10-26 23:05:55.000000','/public/images/pan3.jpg','Pan de Completo',2500,30),(9,'masa','Masas de 1.5 centímetros',_binary '','2025-10-26 23:09:39.000000','/public/images/masa1.jpg','Calzón Roto',400,50),(10,'masa','Masa crocante de 1 centímetro',_binary '','2025-10-26 23:11:02.000000','/public/images/masa3.jpg','Masas de Hojarasca',2000,26),(11,'pie','Frambuesas con crema pastelera',_binary '','2025-10-26 23:14:57.000000','/public/images/kutchen1.jpg','Kutchen de Frambuesa',18000,12),(12,'pie','Rellena con manzanas, crema pastelera y azúcar flor ',_binary '','2025-10-26 23:16:10.000000','/public/images/kutchen2.jpg','Kutchen de Manzana',14500,15),(13,'torta','Bizcocho de vainilla, relleno con crema y frutas',_binary '','2025-10-26 23:27:54.000000','/public/images/torta9.jpg','Mini Tortas',500,5),(14,'queque','Vainilla con glaseado y frutos secos',_binary '','2025-10-26 23:28:52.000000','/public/images/queque1.jpg','Queque de Vainilla',7000,9),(15,'queque','Zanahoria con frutos secos',_binary '','2025-10-26 23:30:48.000000','/public/images/queque3.jpg','Queque de Zanahoria',10000,11),(16,'queque','Chocolate con nueces',_binary '','2025-10-26 23:34:50.000000','/public/images/queque2.jpg','Queque de Chocolate',16000,8);
/*!40000 ALTER TABLE `productos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usuarios`
--

DROP TABLE IF EXISTS `usuarios`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `usuarios` (
  `rut` varchar(255) NOT NULL,
  `contrasena` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `estado` bit(1) DEFAULT NULL,
  `fecha_creacion` datetime(6) DEFAULT NULL,
  `nombre` varchar(255) DEFAULT NULL,
  `rol` varchar(255) DEFAULT NULL,
  `apellido` varchar(255) DEFAULT NULL,
  `comuna` varchar(255) DEFAULT NULL,
  `direccion` varchar(255) DEFAULT NULL,
  `fecha_nacimiento` date DEFAULT NULL,
  `region` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`rut`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuarios`
--

LOCK TABLES `usuarios` WRITE;
/*!40000 ALTER TABLE `usuarios` DISABLE KEYS */;
INSERT INTO `usuarios` VALUES ('21861087','$2a$10$/7C.T.udzHiqWwvus57H4O4M0/hvFLZv4x10.iTT2NOPUj9GmMHDW','gonzalonav@duoc.cl',_binary '','2025-11-18 19:09:50.000000','Gonzalo','cliente','Navarrete','Maipú','Alaska 1371','2005-06-13','Región Metropolitana de Santiago'),('219874189','$2a$10$tebCrShpOMD31KT5eRRPkOcmqKlQpDsu2fXphSyLy9gVGWbMlHE5m','cam.pinoo@duoc.cl',_binary '','2025-11-18 19:12:43.000000','Camila','administrador','Pino','Maipú','aaaa','2005-11-30','Región Metropolitana de Santiago');
/*!40000 ALTER TABLE `usuarios` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-11-21 17:55:18
