const router = require('koa-router')()
const db = require('../db');
router.prefix('/book')


router.get('/dxy', async (ctx, next) => {
	ctx.body="sddsdsddsds";
})


//书类型分页查询
router.post('/list', async (ctx, next) => {
	let type=ctx.request.body.type;
	let pno = ctx.request.body.pno;
	let pageSize = ctx.request.body.pageSize;
	let curPage = parseInt((pno-1)*pageSize);
  let size = parseInt(pageSize);
	let sql="SELECT * FROM bookslist where type=? LIMIT ?,?";
 await db.query(sql,[type,curPage,size]).then(res =>{
		 if (res && res.length > 0) {
			ctx.body={state:200,data:res};
		 }else{
			ctx.body={state:201,data:''};
		 }
 })
})

//书详情信息
router.post('/detail', async (ctx, next) => {
	let id=ctx.request.body.bid;
	let sql="SELECT * FROM bookslist where id=?";
	 await db.query(sql,[id]).then(res =>{
			 if (res && res.length > 0) {
				ctx.body={state:200,data:res};
			 }else{
				ctx.body={state:201,data:''};
			 }
	 })
})
//书内容
router.post('/content', async (ctx, next) => {
	let id=ctx.request.body.id;
	let index=ctx.request.body.index;
	let sql=`select * from book${id} where id=?`;
	 await db.query(sql,[index]).then(res =>{
			 if (res && res.length > 0) {
				ctx.body={state:200,data:res};
			 }else{
				ctx.body={state:201,data:''};
			 }
	 })
})
//书目录
router.post('/title', async (ctx, next) => {
	let id=ctx.request.body.id;
	let sql=`select * from book${id}`;
	 await db.query(sql).then(res =>{
			 if (res && res.length > 0) {
				ctx.body={state:200,data:res};
			 }else{
				ctx.body={state:201,data:''};
			 }
	 })
})


//热门推荐
router.post('/hotbooks', async (ctx, next) => {
	let pno = ctx.request.body.pno;
	let pageSize = ctx.request.body.pageSize;
	let curPage = parseInt((pno-1)*pageSize);
  let size = parseInt(pageSize);
	let sql="select * from bookslist LIMIT ?,?";
	 await db.query(sql,[curPage,size]).then(res =>{
		 if (res && res.length > 0) {
			ctx.body={state:200,data:res};
		 }else{
			ctx.body={state:201,data:''};
		 }
	 })
})
//免费读书
router.post('/freebooks', async (ctx, next) => {
	let pno = ctx.request.body.pno;
	let pageSize = ctx.request.body.pageSize;
	let curPage = parseInt((pno-1)*pageSize);
  let size = parseInt(pageSize);
	let sql="select * from bookslist LIMIT ?,?";
	 await db.query(sql,[curPage,size]).then(res =>{
		 if (res && res.length > 0) {
			ctx.body={state:200,data:res};
		 }else{
			ctx.body={state:201,data:''};
		 }	
	 })
})
//新书专区
router.post('/newbooks', async (ctx, next) => {
	let pno = ctx.request.body.pno;
	let pageSize = ctx.request.body.pageSize;
	let curPage = parseInt((pno-1)*pageSize);
  let size = parseInt(pageSize);
	let sql="select * from bookslist LIMIT ?,?";
	 await db.query(sql,[curPage,size]).then(res =>{
		 if (res && res.length > 0) {
			ctx.body={state:200,data:res};
		 }else{
			ctx.body={state:201,data:''};
		 }	
	 })
})

module.exports = router
