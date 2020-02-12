/*
Navicat MySQL Data Transfer

Source Server         : mysql
Source Server Version : 50612
Source Host           : localhost:3306
Source Database       : bookstore

Target Server Type    : MYSQL
Target Server Version : 50612
File Encoding         : 65001

Date: 2020-02-09 00:58:27
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for borrow
-- ----------------------------
DROP TABLE IF EXISTS `borrow`;
CREATE TABLE `borrow` (
  `bGoods` varchar(11) COLLATE utf8_unicode_ci DEFAULT NULL,
  `bPeople` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `bTime` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- ----------------------------
-- Records of borrow
-- ----------------------------
INSERT INTO `borrow` VALUES ('数据结构', '周树人', '2020-02-01');
INSERT INTO `borrow` VALUES ('三体', '仓央嘉措', '2020-02-02');
INSERT INTO `borrow` VALUES ('钢铁是怎样炼成的', '仓央嘉措', '2020-02-02');
INSERT INTO `borrow` VALUES ('边城', '张爱玲', '2020-02-04');
INSERT INTO `borrow` VALUES ('三体', '周树人', '2020-02-06');

-- ----------------------------
-- Table structure for client
-- ----------------------------
DROP TABLE IF EXISTS `client`;
CREATE TABLE `client` (
  `cId` int(11) NOT NULL AUTO_INCREMENT,
  `cName` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `cCard` int(11) DEFAULT NULL,
  `cTel` int(11) DEFAULT NULL,
  `cSex` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`cId`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- ----------------------------
-- Records of client
-- ----------------------------
INSERT INTO `client` VALUES ('1', '周树人', '9665161', '164868', '男');
INSERT INTO `client` VALUES ('2', '张爱玲', '6486', '99723', '女');
INSERT INTO `client` VALUES ('3', '徐志摩', '6469', '4867', '男');
INSERT INTO `client` VALUES ('4', '琼瑶', '2543', '56757', '女');
INSERT INTO `client` VALUES ('5', '仓央嘉措', '25469', '9897', '男');

-- ----------------------------
-- Table structure for goods
-- ----------------------------
DROP TABLE IF EXISTS `goods`;
CREATE TABLE `goods` (
  `goodsId` int(11) NOT NULL AUTO_INCREMENT,
  `goodsName` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `goodsType` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `goodsPrice` float(10,2) DEFAULT NULL,
  `goodsBorrowPrice` float(10,2) DEFAULT NULL,
  `goodsBorrowDays` int(255) DEFAULT NULL,
  `goodsCount` int(11) DEFAULT NULL,
  `goodsSell` int(11) DEFAULT NULL,
  PRIMARY KEY (`goodsId`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- ----------------------------
-- Records of goods
-- ----------------------------
INSERT INTO `goods` VALUES ('1', 'ECMAScript 6 入门', 'IT', '90.00', '10.00', '2', '500', '50');
INSERT INTO `goods` VALUES ('2', '数据结构', 'IT', '40.00', '6.00', '3', '800', '9');
INSERT INTO `goods` VALUES ('3', '三体', '科幻', '100.00', '15.00', '4', '119', '4');
INSERT INTO `goods` VALUES ('4', '边城', '文学', '60.00', '8.00', '5', '599', '100');
INSERT INTO `goods` VALUES ('5', '钢铁是怎样炼成的', '文学', '120.00', '20.00', '5', '1199', '300');
INSERT INTO `goods` VALUES ('6', '厚黑学', '生活', '200.00', '40.00', '2', '3599', '600');
INSERT INTO `goods` VALUES ('7', '人性的弱点', '生活', '160.00', '35.00', '6', '2000', '105');

-- ----------------------------
-- Table structure for supplier
-- ----------------------------
DROP TABLE IF EXISTS `supplier`;
CREATE TABLE `supplier` (
  `sName` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `sGoods` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `sPrice` float(10,2) DEFAULT NULL,
  `sCount` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- ----------------------------
-- Records of supplier
-- ----------------------------
INSERT INTO `supplier` VALUES ('星星出版社', 'ECMAScript 6 入门', '40.00', '300');
INSERT INTO `supplier` VALUES ('Y工作室', 'ECMAScript 6 入门', '40.00', '250');
INSERT INTO `supplier` VALUES ('星星出版社', '边城', '30.00', '200');
INSERT INTO `supplier` VALUES ('知行杂志', '边城', '30.00', '500');
INSERT INTO `supplier` VALUES ('知行杂志', '三体', '50.00', '125');
INSERT INTO `supplier` VALUES ('长江文艺', '厚黑学', '60.00', '1000');
INSERT INTO `supplier` VALUES ('中华书局', '厚黑学', '60.00', '2200');
INSERT INTO `supplier` VALUES ('译林出版', '厚黑学', '60.00', '1000');
INSERT INTO `supplier` VALUES ('中华书局', '钢铁是怎样炼成的', '80.00', '1000');
INSERT INTO `supplier` VALUES ('上海文艺', '钢铁是怎样炼成的', '80.00', '500');
INSERT INTO `supplier` VALUES ('译林出版', '人性的弱点', '120.00', '1005');
INSERT INTO `supplier` VALUES ('长江文艺', '人性的弱点', '120.00', '1100');
INSERT INTO `supplier` VALUES ('星星出版社', '数据结构', '30.00', '410');
INSERT INTO `supplier` VALUES ('中华书局', '数据结构', '30.00', '400');
INSERT INTO `supplier` VALUES ('烽火书城', 'java编程思想', '60.00', '800');

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(255) CHARACTER SET utf8 COLLATE utf8_bin DEFAULT NULL,
  `password` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `state` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `sex` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `role` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- ----------------------------
-- Records of user
-- ----------------------------
INSERT INTO `user` VALUES ('1', '老夫子', '123', 'offline', '男', '管理员');
INSERT INTO `user` VALUES ('2', '孔乙己', '123', 'offline ', '男', '售卖员');
INSERT INTO `user` VALUES ('3', '李清照', '123', 'offline', '女', '借阅员');
INSERT INTO `user` VALUES ('4', '李白', '123', 'offline', '男', '进货员');
INSERT INTO `user` VALUES ('11', '北岛', '123', null, null, '售卖员');
INSERT INTO `user` VALUES ('12', '戴望舒', '123', null, null, '借阅员');
