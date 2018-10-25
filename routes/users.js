const router = require('koa-router')()
const db = require('../db');
router.prefix('/users')

router.get('/bar', async (ctx, next)=>{
  ctx.body = 'this is a users/bar response'
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
		 await db.query(sql,[phone,pass]).then(res => {
				 if (res && res.length > 0) {
					ctx.body={sate:200,data:''};
				 }else{
					ctx.body={sate:201,data:''};
				 }
					
		 })
		
})




module.exports = router
