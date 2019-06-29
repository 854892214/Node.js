const express = require("express");
const pool = require("./pool");
const bodyParse = require("body-parser");
const session = require("express-session");
const mysql = require('mysql');
var app = express();
app.use(session({
    secret: "128位随机字符",//安全字符串
    resave: false,//每次请求是否都更新数据
    saveUninitialized: true,//初始化时保存数据
    cookie: {
        maxAge: 1000 * 60 * 60 * 8//保存八小时
    }
}))
app.listen(3000);
app.use(express.static("public"));
//配置对特殊 json 是否自动转换  不转换
app.use(bodyParse.urlencoded({
    extended: false
}))
//配置浏览器跨域
const cors = require("cors");
app.use(cors({
    origin: [
        "http://127.0.0.1:8081",
        "http://localhost:8081",
        "http://192.168.1.23:8080",
    ],
    credentials: true
}))
let conn;
reconn()
//对所有请求进行拦截
app.all('*', (req, res, next) => {
    next()
})
//功能一:用户登录
app.get("/login", (req, res) => {
    //参数
    var uname = req.query.uname;
    var upwd = req.query.upwd;
    console.log(uname, upwd);
    //sql
    var sql = " SELECT id FROM xz_login";// SELECT id FROM xz_login WHERE uname ='tom'  AND upwd = md5('1234');
    sql += " WHERE uname = ? AND upwd =md5(?)";//md5
    pool.query(sql, [uname, upwd], (err, result) => {
        if (err) throw err;
        if (result.length == 0) {
            res.send({ code: -1, msg: "用户名或密码有误" });
        } else {
            //将用户登录凭证保存在服务器端 session对象中
            var id = result[0].id;//获取当前用户id
            req.session.uid = id; //保存session
            res.send({ code: 1, msg: "登录成功", data: { userId: id } });
        }
    });
})

//功能七:获取商品详细信息
app.get("/findProduct", (req, res) => {
    //1:参数 pid
    var pid = req.query.pid;
    //2:sql  SELECT lname,price FROM xz_laptop WHERE //lid=?
    var sql = " SELECT lname,price FROM xz_laptop";
    sql += " WHERE lid = ?";
    //3:json {code:1,data:[]}
    pool.query(sql, [pid], (err, result) => {
        if (err) throw err;
        res.send({ code: 1, data: result });
    })
});

app.get("/imagelist", (req, res) => {
    var list = [
        { pid: 1, img_url: "http://127.0.0.1:3000/img/banner-01.png" },
        { pid: 2, img_url: "http://127.0.0.1:3000/img/banner-02.png" },
        { pid: 3, img_url: "http://127.0.0.1:3000/img/banner-01.png" },
        { pid: 4, img_url: "http://127.0.0.1:3000/img/banner-02.png" },
    ];
    res.send(list);
})
//功能二：获取商品列表
app.get("/imglist", (req, res) => {
    var pno = req.query.pno;
    var PageSize = req.query.PageSize;
    if (!pno) pno = 1;
    if (!PageSize) PageSize = 7;
    var offset = (pno - 1) * 7;
    PageSize = parseInt(PageSize);
    var sql = "select id,title,img_url ,ctime,point FROM xz_news LIMIT ?,?;";
    pool.query(sql, [offset, PageSize], (err, result) => {
        if (err) throw err;
        res.send({ code: 200, msg: result, res_message: "SUCCESS", res_code: "ok" });
    })
})
//新闻点击次数+1
app.get('/newsInfoClick', (req, res) => {
    let point = +req.query.point;
    let id = +req.query.id;
    point = point + 1
    id = +(id)
    var sql = "update xz_news set point=? where id = ?";
    //update xz_news set point=2 where id =1
    pool.query(sql, [point, id], (err, result) => {
        if (err) throw err;
        res.send({ res_message: "SUCCESS", res_code: "ok" })
    })
})
app.get("/newslist", (req, res) => {
    var pno = req.query.pno;
    var PageSize = req.query.PageSize;
    if (!pno) pno = 1;
    if (!PageSize) PageSize = 7;
    PageSize = parseInt(PageSize);
    var offset = (pno - 1) * PageSize;
    console.log(offset, PageSize);
    var sql = " SELECT id,title,img_url ,ctime,point FROM xz_news LIMIT ?,?";
    pool.query(sql, [offset, PageSize], (err, result) => {
        if (err) throw err;
        res.send({ code: 1, data: result });
    })
})
app.get("/findNewsInfo", (req, res) => {
    var id = req.query.id;
    //2:创建正则表达式
    var reg = /^\d{1,}$/;
    //3:如果验证失败 输出错误信息{code:-1}
    if (!reg.test(id)) {
        res.send({ code: -1, msg: "新闻编号格式有误" });
        return;//函数停止运行
    }
    //4:创建sql
    var sql = " SELECT id,title,content,ctime";
    sql += " ,img_url FROM xz_news";
    sql += " WHERE id = ?";
    //5:发送sql语句
    pool.query(sql, [id], (err, result) => {
        if (err) throw err;
        res.send({ code: 1, data: result });
    })
})

//1:用户post请求 /addcomment
app.post("/addcomment", (req, res) => {
    //2:获取二个参数 nid content
    var nid = req.body.nid;        //新闻编号
    var content = req.body.content;//评论内容
    var ctime = req.body.ctime;
    //3:创建sql语句
    var sql = "INSERT INTO xz_comment VALUES";
    sql += "(null,?,now(),?)";
    //4:发送sql语句并且返回返回结果
    pool.query(sql, [content, nid], (err, result) => {
        if (err) throw err;
        //判断执行insert语句影响行数
        if (result.affectedRows > 0) {
            res.send({ code: 1, msg: "评论发表成功" });
        } else {
            res.send({ code: -1, msg: "评论发表失败" });
        }
    })
    //5:判断 评论成功 评论失败
});

//功能五:获取评论列表
app.get("/getComment", (req, res) => {
    //1:参数 nid 新闻编号 pno 页码 pageSize 
    //页大小
    var nid = req.query.nid;
    var pno = req.query.pno;
    var pageSize = req.query.pageSize;
    //2:设置默认值 
    if (!pno) { pno = 1 }
    if (!pageSize) { pageSize = 5 }
    //3:sql语句
    var sql = " SELECT id,content,ctime,nid";
    sql += " FROM xz_comment";
    sql += " WHERE nid = ?";
    sql += " LIMIT ?,?";
    //4:offset 行偏移量    
    var offset = (pno - 1) * pageSize;
    //5:页大小造型
    pageSize = parseInt(pageSize);
    pool.query(sql, [nid, offset, pageSize], (err, result) => {
        if (err) throw err;
        res.send({ code: 1, data: result });
    });
})

//功能三:商品分页显示 
app.get("/products", (req, res) => {
    //1:参数 pno pageSize
    var pno = req.query.pno;
    var pageSize = req.query.pageSize;
    //2:允许使用默认值  1 7  15:15
    if (!pno) { pno = 1 }
    if (!pageSize) { pageSize = 7 }
    //3:sql
    var sql = " SELECT l.lid,l.title,";
    sql += " l.price,p.md";
    sql += " FROM xz_laptop l,xz_laptop_pic p";
    sql += " WHERE l.lid = p.laptop_id";
    sql += " GROUP BY l.lid";
    sql += " LIMIT ?,?";
    //4:json 
    var offset = (pno - 1) * pageSize;
    pageSize = parseInt(pageSize);
    pool.query(sql, [offset, pageSize], (err, result) => {
        if (err) throw err;
        res.send({ code: 1, data: result });
    })
});
//购物车添加
app.get("/addcart", (req, res) => {
    //0:判断用户是否登录
    if (!req.session.uid) {
        res.send({ code: -1, msg: "请登录" });
        return;
    }
    //1:参数 pid count uid price
    var count = req.query.count
    var pid = parseInt(req.query.pid);
    //var count = 1;
    var uid = req.session.uid;
    var price = parseInt(req.query.price);
    console.log(pid, uid, price);
    var sql = " SELECT id FROM xz_cart";
    sql += " WHERE uid = ? AND pid = ?";
    pool.query(sql, [uid, pid], (err, result) => {
        if (err) throw err;
        if (result.length == 0) {
            //  select * from xz_cart;
            var sql = ` INSERT INTO xz_cart`;
            sql += ` VALUES(null,${count},${price},${pid},${uid})`;
        } else {
            var sql = ` UPDATE xz_cart`;
            sql += ` SET count=count+${count} WHERE pid=${pid}`;
            sql += ` AND uid = ${uid}`;
        }
        pool.query(sql, (err, result) => {
            if (err) throw err;
            if (result.affectedRows > 0) {
                res.send({ code: 1, msg: "添加成功" });
            } else {
                res.send({ code: -1, msg: "添加失败" });
            }
        })
    })
})

app.get("/delCartItem", (req, res) => {
    //1:参数 id   9:38
    var id = req.query.id;
    //2:sql  DELETE
    var sql = "DELETE FROM xz_cart WHERE id = ?";
    pool.query(sql, [id], (err, result) => {
        if (err) throw err;
        if (result.affectedRows > 0) {
            res.send({ code: 1, msg: "删除成功" });
        } else {
            res.send({ code: -1, msg: "删除失败" });
        }
    });
    //3:json msg
});

//功能十:购物车列表
app.get("/cartlist", (req, res) => {
    //如果session对象中uid不存在
    //原因:当前没有登录
    if (!req.session.uid) {
        res.send({ code: -1, msg: "请登录" });
        return;
    }
    //参数 uid   
    var uid = req.session.uid;
    //sql  多表查询
    var sql = " SELECT c.id,c.count,c.price,";
    sql += " c.uid,c.pid,l.lname";
    sql += " FROM xz_cart c,xz_laptop l";
    sql += " WHERE l.lid = c.pid";
    sql += " AND c.uid = ?";
    pool.query(sql, [uid], (err, result) => {
        if (err) throw err;
        res.send({ code: 1, data: result })
    })
});

//功能十二:删除购物车中多个指定商品
app.get("/removeMItem", (req, res) => {
    //1:参数 ids  3,4 9:35
    var ids = req.query.ids;
    //2:sql DELETE
    var sql = " DELETE FROM xz_cart ";
    sql += " WHERE id IN (" + ids + ")";
    //http://127.0.0.1:3000/removeMItem?ids=3,8
    pool.query(sql, (err, result) => {
        if (err) throw err;
        if (result.affectedRows > 0) {
            res.send({ code: 1, msg: "删除成功" })
        } else {
            res.send({ code: -1, msg: "删除失败" })
        }
    })
    //4:请求地址格式
});


var async = {};
Object.defineProperty(async, 'data', {
    get: function () {
        return data;
    },
    set: function (newValue) {
        data = newValue;
        console.log('set :', newValue);
        if (newValue == true) {
            console.log(222)
            selCart(async.uid);
        }
    }
})
function selCart(uid) {
    //参数 uid   
    // var uid = req.session.uid;
    console.log(uid)
    //sql  多表查询
    var sqlCart = " SELECT c.id,c.count,c.price,";
    sqlCart += " c.uid,c.pid,l.lname";
    sqlCart += " FROM xz_cart c,xz_laptop l";
    sqlCart += " WHERE l.lid = c.pid";
    sqlCart += " AND c.uid = ?";
    pool.query(sqlCart, [uid], (err, result) => {
        if (err) throw err;
        async.data=result
        // async.send({data:async.data,res_message:"SUCCESS"})
        // res.send({ res_message: "SUCCESS", res_code: "ok", data: result })
    })
}
//修改购物车数据
app.post("/updateCart", (req, res) => {
    var uid = req.query.uid;
    async.send=res.send();
    async.uid=req.query.uid;
    let pidList = req.body.pid;
    let countList = req.body.count;
    for (let i = 0; i < pidList.length; i++) {
        let pid, count;
        pid = pidList[i]
        count = countList[i]
        let sql = "update xz_cart set count = ? where uid = ? and pid = ?";
        pool.query(sql, [parseInt(count), +uid, parseInt(pid)], (err, result) => {
            if (err) throw err;
            if (i == pidList.length - 1) {
                async.data = true
            }
        })
    }
})
//断线重连机制
function reconn() {
    conn = mysql.createConnection({ pool });
    conn.on('error', err => err.code === "PROTOCOL_CONNECTION_LOST" && setTimeout(reconn, 2000))
}
