/*
    业务模块
*/
const path = require('path');
const fs = require('fs');
const db = require('./db.js');

// 自动生成图书编号（自增）
// let maxBookCode = ()=>{
//     let arr = [];
//     data.forEach((item)=>{
//         arr.push(item.id);
//     });
//     return Math.max.apply(null,arr);
// }
// // 把内存数据写入文件
// let writeDataToFile = (res) => {
//     fs.writeFile(path.join(__dirname,'data.json'),JSON.stringify(data,null,4),(err)=>{
//         if(err){
//             res.send('server error');
//         }
//         // 文件写入成功之后重新跳转到主页面
//         res.redirect('/');
//     });
// }
//登陆验证
exports.loginIn = (req, res) => {
    let param = req.body;
    let sql = 'select count(*) as total from User where username=? and password=?';
    let data = [param.username, param.password];

    db.base(sql, data, (result) => {
        if (result[0].total == 1) {
            res.json({ tips: 1 });
        } else {
             res.json({ tips: 2 });
        }
    });

}
exports.allBooks = (req,res) => {
    let sql = 'select * from goods';
    db.base(sql,null,(result)=>{
        res.json(result);
    });
};
exports.allUsers = (req,res) => {
    let sql = 'select * from user';
    db.base(sql,null,(result)=>{
        res.json(result);
    });
};
exports.allClient = (req,res) => {
    let sql = 'select * from client';
    db.base(sql,null,(result)=>{
        res.json(result);
    });
};
exports.allBorrows = (req,res) => {
    let sql = 'select * from borrow';
    db.base(sql,null,(result)=>{
        res.json(result);
    });
};
exports.addBorrow = (req,res) => {
    let info = req.body;
    let sql = 'insert into borrow set ?';
    db.base(sql,info,(result)=>{
        if(result.affectedRows == 1){
            res.json({flag : 1});
        }else{
            res.json({flag : 2});
        }  
    });
};
exports.addUser = (req,res) => {
    let info = req.body;
    let sql = 'insert into user set ?';
    db.base(sql,info,(result)=>{
        if(result.affectedRows == 1){
            res.json({flag : 1});
        }else{
            res.json({flag : 2});
        }  
    });
};
exports.addClient = (req,res) => {
    let info = req.body;
    let sql = 'insert into client set ?';
    db.base(sql,info,(result)=>{
        if(result.affectedRows == 1){
            res.json({flag : 1});
        }else{
            res.json({flag : 2});
        }  
    });
};
exports.addSupply = (req,res) => {
    let info = req.body;
    console.log(info)
    let sql = 'insert into supplier set ?';
    db.base(sql,info,(result)=>{
        if(result.affectedRows == 1){
            res.json({flag : 1});
        }else{
            res.json({flag : 2});
        }  
    });
};
exports.allSuppliers = (req,res) => {
    let sql = 'select * from supplier';
    db.base(sql,null,(result)=>{
        res.json(result);
    });
};
exports.SearchBooks = (req,res) => {
    let param = req.body;
   
    let sql = 'select * from goods where '+param.title+'=?';
     let data = [param.content];

    db.base(sql,data,(result)=>{
        res.json(result);
    });
};
exports.SearchUsers = (req,res) => {
    let param = req.body;
   
    let sql = 'select * from user where '+param.title+'=?';
     let data = [param.content];

    db.base(sql,data,(result)=>{
        res.json(result);
    });
};
exports.SearchClient = (req,res) => {
    let param = req.body;
   
    let sql = 'select * from client where '+param.title+'=?';
     let data = [param.content];

    db.base(sql,data,(result)=>{
        res.json(result);
    });
};
exports.SearchSuppliers = (req,res) => {
    let param = req.body;
   
    let sql = 'select * from supplier where '+param.title+'=?';
     let data = [param.content];

    db.base(sql,data,(result)=>{
        res.json(result);
    });
};
exports.SearchClient = (req,res) => {
    let param = req.body;
   
    let sql = 'select * from client where '+param.title+'=?';
     let data = [param.content];

    db.base(sql,data,(result)=>{
        res.json(result);
    });
};
exports.editBook = (req,res) => {
    let info = req.body;
    let sql = 'update goods set goodsCount=goodsCount-'+info.num+',goodsSell=goodsSell+'+info.num+' where goodsId=?';
    let data = [info.goodsId];
    db.base(sql,data,(result)=>{
        if(result.affectedRows == 1){
            res.json({flag : 1});
        }else{
            res.json({flag : 2});
        }  
    });
};
exports.editUser = (req,res) => {
    let info = req.body;
    let sql = 'update user set role=? where id='+info.id+'';
    let data = [info.role];
    db.base(sql,data,(result)=>{
        if(result.affectedRows == 1){
            res.json({flag : 1});
        }else{
            res.json({flag : 2});
        }  
    });
};
exports.editUser1 = (req,res) => {
    let info = req.body;
    let sql = "update user set state=? where username='"+info.username+"'";
    let data = [info.state];
    db.base(sql,data,(result)=>{
        if(result.affectedRows == 1){
            res.json({flag : 1});
        }else{
            res.json({flag : 2});
        }  
    });
};
exports.editClient = (req,res) => {
    let info = req.body;
    let sql = 'update client set cTel=? where cId='+info.cId+'';
    let data = [info.cTel];
    db.base(sql,data,(result)=>{
        if(result.affectedRows == 1){
            res.json({flag : 1});
        }else{
            res.json({flag : 2});
        }  
    });
};
exports.editBook1 = (req,res) => {
    let info = req.body;

    let sql = 'update goods set goodsCount=goodsCount+'+info.count+' where goodsName=?';
    let data = [info.goodsName];
    db.base(sql,data,(result)=>{
        console.log(result);
        if(result.affectedRows == 1){
            res.json({flag : 1});
        }else{
            res.json({flag : 2});
        }  
    });
};
exports.editBook2 = (req,res) => {
    let info = req.body;
    let sql = 'update goods set goodsBorrowDays=goodsBorrowDays+'+info.count+' where goodsName=?';
    let data = [info.goodsName];
    db.base(sql,data,(result)=>{
        if(result.affectedRows == 1){
            res.json({flag : 1});
        }else{
            res.json({flag : 2});
        }  
    });
};
exports.deleteBorrow = (req,res) => {
     let info = req.body;
    let sql = 'delete from borrow where bGoods=? and bPeople=?';
    let data = [info.bGoods,info.bPeople,info.bTime];
    db.base(sql,data,(result)=>{
        if(result.affectedRows == 1){
            res.json({flag : 1});
        }else{
            res.json({flag : 2});
        } 
    });
};
exports.deleteUser = (req,res) => {
     let info = req.body;
    let sql = 'delete from user where id=?';
    let data = [info.id];
    db.base(sql,data,(result)=>{
        if(result.affectedRows == 1){
            res.json({flag : 1});
        }else{
            res.json({flag : 2});
        } 
    });
};
exports.deleteClient = (req,res) => {
     let info = req.body;
    let sql = 'delete from client where cId=?';
    let data = [info.cId];
    db.base(sql,data,(result)=>{
        if(result.affectedRows == 1){
            res.json({flag : 1});
        }else{
            res.json({flag : 2});
        } 
    });
};