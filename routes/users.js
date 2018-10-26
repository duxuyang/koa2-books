const router = require('koa-router')()
const db = require('../db');
router.prefix('/users')


router.get('/', async (ctx, next)=>{
	ctx.body="23233232323232"
	
})

router.get('/ceshi', async (ctx, next)=>{
 let name=ctx.request.query.username;
 ctx.body=name;
 console.log(name)
})

//登录
router.post('/login', async (ctx, next)=>{
	let uname=ctx.request.body.username;
	let upass=ctx.request.body.password;
	let sql="select * from user where uname=? and upass=?"
	 await db.query(sql,[uname,upass]).then(res => {
		   if (res && res.length > 0) {
				ctx.body={sate:200,id:res[0].id};
			 }else{
				ctx.body={sate:201,data:res};
			 }
	 })
})

//注册
router.post('/regist', async (ctx, next)=>{
		let phone= ctx.request.body.phone;
		let pass= ctx.request.body.password;
	  let sql="insert into user value(null,?,?,null)";
	 await db.query(sql,[phone,pass]).then(res =>{
			 if (res && res.length > 0) {
				ctx.body={sate:200,data:''};
			 }else{
				ctx.body={sate:201,data:''};
			 }
	 })
})

module.exports = router
