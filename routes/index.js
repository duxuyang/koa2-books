const router = require('koa-router')()

router.get('/', async (ctx, next) => {
  await ctx.render('index', {
    title: 'Hello Koa 2!'
  })
})


//类型分页查询
router.post('/list', async (ctx, next) => {
	let type=ctx.request.body.type;
	let pno = ctx.request.body.pno;
	let pageSize = ctx.request.body.pageSize;
	let curPage = parseInt((pno-1)*pageSize);
  let size = parseInt(pageSize);
	let sql="SELECT * FROM bookslist where type=? LIMIT ?,?";
 await db.query(sql,[type,curPage,size]).then(res =>{
		 if (res && res.length > 0) {
			ctx.body={sate:200,data:res};
		 }else{
			ctx.body={sate:201,data:''};
		 }
 })
})



module.exports = router
