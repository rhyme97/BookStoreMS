/*
    路由模块
*/

const express = require('express');
const router = express.Router();
const service = require('./service.js');

// 路由处理
//登陆验证
router.post('/check',service.loginIn);
//渲染图书表
router.get('/books',service.allBooks);
router.post('/books/book',service.SearchBooks);
router.put('/books/bBook',service.editBook1);
router.put('/books/book',service.editBook);
router.put('/books/dBook',service.editBook2);
//借阅渲染
router.get('/borrow',service.allBorrows);
//借阅添加
router.post('/addborrow',service.addBorrow);
// 删除借阅信息
router.delete('/borrow',service.deleteBorrow);
//查找客户
router.post('/clients/client',service.SearchClient);
//员工管理
router.get('/users',service.allUsers);
router.post('/users/user',service.SearchUsers);
router.post('/addUser',service.addUser);
router.delete('/user',service.deleteUser);
router.put('/user',service.editUser);
router.put('/userstate',service.editUser1);
//供货管理
router.get('/supplier',service.allSuppliers);
router.post('/suppliers/supplier',service.SearchSuppliers);
router.post('/addSupply',service.addSupply);
//会员管理
router.get('/clients',service.allClient);
router.post('/clients/client',service.SearchClient);
router.post('/addClient',service.addClient);
router.delete('/client',service.deleteClient);
router.put('/clients',service.editClient);
module.exports = router;